import React, { useState, useEffect } from "react";
import styles from "./WatchlistMovieDetail.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Poster from "../Poster/Poster";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import { getGenres } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
const WatchListMovieDetail = (props) => {
  console.log("WatchListMovieDetail received props:", props);
  const [myday, setMyday] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mydayText, setMydayText] = useState("Add to My Day");
  const [watchlistmovie] = useState(props.movie);

  //   useEffect(() => {
  //     setWatchlistMovie(props.movie);
  //   }, [props.movie]);
  //   console.log("Watchlistmovie state:", watchlistmovie);

  const starStyling = `fa fa-star ${styles.checked}`;
  const genres = watchlistmovie ? getGenres(watchlistmovie.genre_ids) : null;
  const movieTitle = watchlistmovie
    ? `${watchlistmovie.title} (${watchlistmovie.release_date.slice(0, 4)})`
    : null;
  const navigate = useNavigate();
  const movieOnchangeHandler = (event) => {
    event.preventDefault();
    props.onchangeHandler(event);
    navigate(`/watchlist/${props.params}`);
    //   const newMovie = movies.filter(
    //     (movie) => movie.id !== Number(event.target.value)
    //   );
    //   setMovies((prevMovies) => [...prevMovies, ...newMovie]);
    //   // add movie to the watched array
    //   const watchedMovie = movies.filter(
    //     (movie) => movie.id === Number(event.target.value)
    //   );
    //   setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
  };
  const mydayHandler = (event) => {
    event.preventDefault();
    setMydayText("Added to My Day");
    // add movie to myday array
    const newmyday = [...myday, watchlistmovie];
    setMyday(newmyday);
    localStorage.setItem("myday", JSON.stringify(newmyday));
  };
  const duedateHandler = (event) => {
    event.preventDefault();
    setShowDatePicker(true);
  };
  const backHandler = (event) => {
    event.preventDefault();
    navigate(`/watchlist/${props.params}`);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const shortdate = formatDate(date);
    // add the date to watchlistmovie object
    const newinfo = [{ ...watchlistmovie, date: shortdate }];

    localStorage.setItem("newinfo", JSON.stringify(newinfo));
    setShowDatePicker(false);
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
      <section>
        <Button onClick={backHandler}>Back</Button>
      </section>
      <section className={styles.watchlistmovie}>
        {!props.watched.includes(watchlistmovie) && (
          <label className={styles.custom_radio}>
            <input
              type="radio"
              name={watchlistmovie.name}
              value={watchlistmovie.id}
              onChange={movieOnchangeHandler}
            ></input>
            <span className={styles.checkmark}></span>
          </label>
        )}
        <div className={styles.movie_detail}>
          <div className={styles.movie_detail_top}>
            <Poster
              movie={watchlistmovie}
              className={styles.movie_detail_poster}
            />
            <MovieBackdrop movie={watchlistmovie} />
          </div>
          <div className={styles.movie_detail_content}>
            <div className={styles.movie_detail_left}>
              <h2>{movieTitle}</h2>

              <h3 className={styles.sTitle}>
                <span className={starStyling}></span>
                {watchlistmovie.vote_average}
              </h3>
              <h4 className={styles.sTitle}>GENRES</h4>
              <p>{genres}</p>
              <h4 className={styles.sTitle}>OVERVIEW</h4>
              <p>{watchlistmovie.overview}</p>
            </div>
            <div className={styles.movie_detail_right}>
              <button className={styles.button} onClick={mydayHandler}>
                {mydayText === "Add to My Day" ? (
                  <>
                    <p>Add to My Day</p>

                    <span className={`material-icons-outlined ${styles.icon}`}>
                      light_mode
                    </span>
                  </>
                ) : (
                  <p>Added to my day</p>
                )}
              </button>
              <button className={styles.button} onClick={duedateHandler}>
                {selectedDate ? (
                  <p>{formatDate(selectedDate)}</p>
                ) : (
                  <>
                    <p>Add due date</p>
                    <span className={`material-icons-outlined ${styles.icon}`}>
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
          </div>
        </div>
      </section>
    </>
  );
};
export default WatchListMovieDetail;
