import React, { Fragment, useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  // useSearchParams,
  // Link,
  useLocation,
} from "react-router-dom";
import styles from "./Watchlist.module.css";

import Banner from "../Components/UI/Banner";
import MovieItems from "../Components/MovieItems/MovieItems";

import WatchListMovieDetail from "../Components/WatchListMovieDetail/WatchlistMovieDetail";
import { movie } from "../Utils/utils";

const Watchlist = (props) => {
  const params = useParams();
  const watchlistId = params.watchlistId;
  // console.log(params.watchlistId);
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [myday, setMyday] = useState([]);

  const navigate = useNavigate();

  // const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect");
    if (!localStorage.getItem("myday")) {
      localStorage.setItem("myday", JSON.stringify([]));
    } else {
      const myday = JSON.parse(localStorage.getItem("myday"));
      setMyday(myday);
    }
    setMovies(movie);
  }, []);

  // console.log("Movies state:", movies);
  // console.log("Watched state:", watched);

  const onchangeHandler = (movieId) => {
    setMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== Number(movieId))
    );
    const watchedMovie = movies.filter((movie) => movie.id === Number(movieId));
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
  };
  const handleResultClick = (id, movie) => {
    console.log("id:", id);
    console.log("movie:", movie);
    navigate(`/watchlist/${watchlistId}/${id}`, {
      state: {
        watchlistMovie: movie,
        // watched: watched,
        // params: watchlistId,
        // onchangeHandler: onchangeHandler,
      },
    });
    // state: {
    //   watchlistMovie: movie,
    //   watched: watched,
    //   params: watchlistId,
    //   onchangeHandler: onchangeHandler,
    // },
  };

  return (
    <Fragment>
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
      {movies.length === 0 && (
        <Banner>Well done you have watched all movies in your watchlist</Banner>
      )}
      {movies.length >= 0 && (
        <section className={styles.initial}>
          {movies.length > 0 && <h4 className={styles.tag}>To Watch</h4>}
          <MovieItems
            movies={movies}
            onchangeHandler={onchangeHandler}
            handleResultClick={handleResultClick}
            radio={true}
            params={watchlistId}
          ></MovieItems>
        </section>
      )}

      {watched.length > 0 && (
        <section className={styles.watched}>
          <h4 className={styles.tag}>Watched</h4>
          <MovieItems
            movies={watched}
            radio={false}
            handleResultClick={handleResultClick}
            params={watchlistId}
          ></MovieItems>
        </section>
      )}
    </Fragment>
  );
};
export default Watchlist;
