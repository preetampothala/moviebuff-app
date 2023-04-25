import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./WatchlistMovieDetail.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Poster from "../Poster/Poster";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import { getGenres } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import WatchlistContext from "../../Store/watchlist-context";
import Alert from "../UI/Alert";

const WatchListMovieDetail = () => {
  const watchlistCtx = useContext(WatchlistContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mydayText, setMydayText] = useState("Add to My Day");
  const [plannedText, setPlannedText] = useState("Add due date");
  const { movie, watched, watchlist, date, params } = useLocation().state || {};
  const starStyling = `fa fa-star ${styles.checked}`;
  const genres = movie ? getGenres(movie.genre_ids) : null;
  const movieTitle = movie
    ? `${movie.title} (${movie.release_date.slice(0, 4)})`
    : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (movie.myday !== undefined) {
      console.log(movie.myday);
      setMydayText("Added to My Day");
    }
  }, [movie.myday]);
  useEffect(() => {
    if (movie.planned !== undefined) {
      console.log(movie.planned);
      setPlannedText("Added due date");
    }
  }, [movie.planned]);

  const mydayHandler = (event) => {
    console.log("myday");
    event.preventDefault();
    setMydayText("Added to My Day");
    setShowAlert(true);
    setAlertText(`${movie.title} Movie Added to My Day`);
    watchlistCtx.addToDay(movie.id, watchlist.watchlistId);
    // addToMyDay(movie.id, watchlist.id, watchlist.userId);
  };
  const duedateHandler = (event) => {
    console.log(event);
    event.preventDefault();
    setShowDatePicker(true);
  };
  const backHandler = () => {
    navigate(-1);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const shortdate = formatDate(date);
    setPlannedText(shortdate);
    watchlistCtx.addPlanned(movie.id, watchlist.watchlistId, shortdate);
    setShowDatePicker(false);
    setShowAlert(true);
    setAlertText(`Watch date set for ${movie.title} ${shortdate}`);
  };
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      {showAlert && (
        <Alert show={showAlert} onClose={handleAlertClose}>
          {alertText}
        </Alert>
      )}
      <section>
        <Button className={styles.button} onClick={backHandler}>
          <span className="material-icons">arrow_back</span> Back
          {/* {watchlist.watchlistName} */}
        </Button>
      </section>
      <section>
        <div className={styles.watchlisttitle}>
          <h1 className={styles.titlename}>{watchlist.watchlistName}</h1>
          <div className={styles.titletwo}>
            {watchlist.movies.length > 0 ? (
              <p>{watchlist.movies.length} movies</p>
            ) : (
              <p>0 {watchlist.movies.length} movie</p>
            )}
          </div>
        </div>
        <p>{`Created ${date}`}</p>
        <p className={styles.watchlist_description}>{watchlist.description}</p>
      </section>

      <section className={styles.watchlistmovie}>
        <div className={styles.movie_detail}>
          <div className={styles.movie_detail_top}>
            <Poster movie={movie} className={styles.movie_detail_poster} />
            <MovieBackdrop movie={movie} />
          </div>
          <div className={styles.movie_detail_content}>
            <div className={styles.movie_detail_left}>
              <h2>{movieTitle}</h2>

              <h3 className={styles.sTitle}>
                <span className={starStyling}></span>
                {movie.vote_average}
              </h3>
              <h4 className={styles.sTitle}>GENRES</h4>
              <p>{genres}</p>
              <h4 className={styles.sTitle}>OVERVIEW</h4>
              <p>{movie.overview}</p>
            </div>
            {watched !== "watched" && (
              <div className={styles.movie_detail_right}>
                <button className={styles.button} onClick={mydayHandler}>
                  <>
                    <p>{mydayText}</p>
                    <span className={`material-icons-outlined ${styles.icon}`}>
                      light_mode
                    </span>
                  </>
                </button>
                <button className={styles.button} onClick={duedateHandler}>
                  {selectedDate ? (
                    <p>{formatDate(selectedDate)}</p>
                  ) : (
                    <>
                      <p>{plannedText}</p>
                      <span
                        className={`material-icons-outlined ${styles.icon}`}
                      >
                        calendar_month
                      </span>
                    </>
                  )}
                </button>
                {showDatePicker && (
                  <ReactDatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    inline
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default WatchListMovieDetail;
