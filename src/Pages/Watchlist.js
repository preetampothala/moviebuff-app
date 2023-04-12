import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Watchlist.module.css";
import Banner from "../Components/UI/Banner";
import MovieItems from "../Components/MovieItems/MovieItems";
import { movie } from "../Utils/utils";

const Watchlist = (props) => {
  const params = useParams();
  const watchlistId = params.watchlistId;
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const onchangeHandler = (movieId) => {
    setMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== Number(movieId))
    );
    const watchedMovie = movies.filter((movie) => movie.id === Number(movieId));
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
  };
  useEffect(() => {
    setMovies(movie);
  }, []);

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
            // handleResultClick={handleResultClick}
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
            // handleResultClick={handleResultClick}
            params={watchlistId}
          ></MovieItems>
        </section>
      )}
    </Fragment>
  );
};
export default Watchlist;
