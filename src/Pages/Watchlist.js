import React, { Fragment, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./Watchlist.module.css";
import SearchResult from "../Components/SearchResult/SearchResult";
import Poster from "../Components/Poster/Poster";
import MovieBackdrop from "../Components/MovieBackdrop/MovieBackdrop";
import { getGenres, formatRuntime } from "../Utils/utils";
const movie = [
  {
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 27205,
    original_language: "en",
    original_title: "Inception",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
  {
    adult: false,
    backdrop_path: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    genre_ids: [18, 28, 80, 53],
    id: 155,
    original_language: "en",
    original_title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    popularity: 89.895,
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-14",
    title: "The Dark Knight",
    video: false,
    vote_average: 8.509,
    vote_count: 29448,
  },
  {
    adult: false,
    backdrop_path: "/mfJepkInUbiZ0mFXFhDNz8ko6Zr.jpg",
    genre_ids: [18, 9648, 878],
    id: 1124,
    original_language: "en",
    original_title: "The Prestige",
    overview:
      "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.",
    popularity: 44.628,
    poster_path: "/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    release_date: "2006-10-19",
    title: "The Prestige",
    video: false,
    vote_average: 8.202,
    vote_count: 14018,
  },
];
const Watchlist = (props) => {
  const params = useParams();
  const location = useLocation();
  const watchlistmovie = location.state ? location.state : null;
  const starStyling = `fa fa-star ${styles.checked}`;
  //   const runtime = watchlistmovie.runtime
  //     ? formatRuntime(watchlistmovie.runtime)
  //     : null;
  const genres = watchlistmovie ? getGenres(watchlistmovie.genre_ids) : null;
  const movieTitle = watchlistmovie
    ? `${watchlistmovie.title} (${watchlistmovie.release_date.slice(0, 4)})`
    : null;

  const navigate = useNavigate();
  const [movies, setMovies] = useState(movie);
  const [watched, setWatched] = useState([]);
  const onchangeHandler = (event) => {
    event.preventDefault();
    // delete movie from the movie array
    const newMovie = movies.filter(
      (movie) => movie.id !== Number(event.target.value)
    );
    console.log(newMovie);
    setMovies(newMovie);
    // add movie to the watched array
    const watchedMovie = movies.filter(
      (movie) => movie.id === Number(event.target.value)
    );
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
  };
  const movieOnchangeHandler = (event) => {
    console.log(event.target.value);
    event.preventDefault();
    const newMovie = movies.filter(
      (movie) => movie.id !== Number(event.target.value)
    );
    console.log(newMovie);
    setMovies(newMovie);
    // add movie to the watched array
    const watchedMovie = movies.filter(
      (movie) => movie.id === Number(event.target.value)
    );
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
    navigate(`/watchlist/${params.watchlistId}`);
  };

  const handleResultClick = (id, movie) => {
    navigate(`/watchlist/${params.watchlistId}/${id}`, { state: movie });
  };
  const mydayHandler = (event) => {
    event.preventDefault();
    console.log(event.target.innerText);
  };
  const duedateHandler = (event) => {
    event.preventDefault();
    console.log(event.target.innerText);
  };

  return (
    <Fragment>
      {!watchlistmovie && (
        <>
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
              aliquam nisl nisl et nisl. Nullam auctor, nisl nec ultricies
              lacinia. lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl,
              nec aliquam nisl nisl et nisl. Nullam auctor, nisl nec ultricies
              lacinia.
            </p>
          </section>
          <section className={styles.initial}>
            {movies.length === 0 && (
              <p>Well done you have watched all movies in your watchlist</p>
            )}
            {movies.length > 0 && <h4 className={styles.tag}>To Watch</h4>}
            <ul className={styles.ul}>
              {movies.map((movie) => {
                return (
                  <li className={styles.li} key={movie.id}>
                    <hr></hr>
                    <div
                      className={styles.listitem}
                      onClick={() => handleResultClick(movie.id, movie)}
                    >
                      <label className={styles.custom_radio}>
                        <input
                          type="radio"
                          name={movie.name}
                          value={movie.id}
                          onChange={onchangeHandler}
                        ></input>
                        <span className={styles.checkmark}></span>
                      </label>
                      <SearchResult movie={movie}></SearchResult>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className={styles.watched}>
            {watched.length > 0 && <h4 className={styles.tag}>Watched</h4>}
            <ul className={styles.ul}>
              {watched.map((movie) => {
                return (
                  <li className={styles.li} key={movie.id}>
                    <hr></hr>
                    <div
                      className={styles.listitem}
                      onClick={() => handleResultClick(movie.id, movie)}
                    >
                      <SearchResult movie={movie}></SearchResult>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}

      {watchlistmovie && (
        <>
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
              aliquam nisl nisl et nisl. Nullam auctor, nisl nec ultricies
              lacinia. lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl,
              nec aliquam nisl nisl et nisl. Nullam auctor, nisl nec ultricies
              lacinia.
            </p>
            <hr></hr>
          </section>
          <section className={styles.watchlistmovie}>
            <label className={styles.custom_radio}>
              <input
                type="radio"
                name={watchlistmovie.name}
                value={watchlistmovie.id}
                onChange={movieOnchangeHandler}
              ></input>
              <span className={styles.checkmark}></span>
            </label>
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
                    <p>Add to my day</p>
                    {/* <span className="material-symbols-outlined">
                      light_mode
                    </span> */}
                    <span className={`material-icons-outlined ${styles.icon}`}>
                      light_mode
                    </span>
                  </button>
                  <button className={styles.button} onClick={duedateHandler}>
                    <p>Add due date</p>
                    <span className={`material-icons-outlined ${styles.icon}`}>
                      calendar_month
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Fragment>
  );
};
export default Watchlist;
