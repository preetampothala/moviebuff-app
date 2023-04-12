import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./WatchlistMovieDetail.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Poster from "../Poster/Poster";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import { getGenres } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
const WatchListMovieDetail = (props) => {
  const [myday, setMyday] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mydayText, setMydayText] = useState("Add to My Day");
  const { state } = useLocation();
  const params = useParams();
  const [watchlistmovie] = useState(state.movie);
  const [watched] = useState(state.watched);
  const starStyling = `fa fa-star ${styles.checked}`;
  const genres = watchlistmovie ? getGenres(watchlistmovie.genre_ids) : null;
  const movieTitle = watchlistmovie
    ? `${watchlistmovie.title} (${watchlistmovie.release_date.slice(0, 4)})`
    : null;

  const navigate = useNavigate();
  //   const movieOnchangeHandler = (movieid) => {
  //     navigate(`/watchlist/${params.watchlistId}`, {
  //       state: { watchlistmovie: movieid },
  //     });
  //   };
  useEffect(() => {
    if (!localStorage.getItem("myday")) {
      localStorage.setItem("myday", JSON.stringify([]));
    } else {
      const myday = JSON.parse(localStorage.getItem("myday"));
      setMyday(myday);
    }
  }, []);
  const mydayHandler = (event) => {
    console.log("myday");
    event.preventDefault();
    setMydayText("Added to My Day");
    const myday = JSON.parse(localStorage.getItem("myday"));
    const newmyday = [...myday, watchlistmovie];
    setMyday((prev) => [...prev, watchlistmovie]);
    localStorage.setItem("myday", JSON.stringify(newmyday));
  };
  const duedateHandler = (event) => {
    console.log(event);
    event.preventDefault();
    setShowDatePicker(true);
  };
  const backHandler = () => {
    navigate(`/watchlist/${params.watchlistId}`);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const shortdate = formatDate(date);
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
        <Button className={styles.button} onClick={backHandler}>
          Back
        </Button>
      </section>
      <section>
        <div className={styles.watchlisttitle}>
          <h1 className={styles.titlename}>Watchlist name</h1>
          <div className={styles.titletwo}>
            <p>0 movies</p>
          </div>
        </div>
        <p>Created: 12-11-2023</p>
        <p className={styles.watchlist_description}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec
          aliquam nisl nisl et nisl. Nullam auctor, nisl nec ultricies lacinia.
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec
          aliquam nisl nisl et nisl. Nullam auctor, nisl nec ultricies lacinia.
        </p>
      </section>

      <section className={styles.watchlistmovie}>
        {/* {!watched.includes(watchlistmovie) && (
          <label htmlFor={watchlistmovie.id} className={styles.custom_radio}>
            <input
              type="radio"
              name={watchlistmovie.id}
              value={watchlistmovie.id}
              className={styles.input}
              onClick={() => movieOnchangeHandler(watchlistmovie.id)}
            />
          </label>
        )} */}
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
              {/* <Button
                onClick={movieOnchangeHandler}
                value={watchlistmovie.id}
                className={styles.watchlistbutton}
              >
                Mark Watched
              </Button> */}
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
