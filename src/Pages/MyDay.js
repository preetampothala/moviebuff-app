import React, { useEffect, useState, useContext } from "react";
import { dayName, monthName } from "../Utils/utils";
import Banner from "../Components/UI/Banner";
import styles from "./MyDay.module.css";
import MovieItems from "../Components/MovieItems/MovieItems";
// import { fetchUserWatchlists } from "../Services/Watchlist.service";
import AuthContext from "../Store/auth-context";
import WatchlistContext from "../Store/watchlist-context";

const MyDay = () => {
  const authCtx = useContext(AuthContext);
  const watchlistCtx = useContext(WatchlistContext);
  const [mydayMovies, setmydayMovies] = useState([]);

  const [watched, setWatched] = useState([]);
  const date = new Date();
  const fullDate = `${dayName(date.getDay())}, ${date.getDate()} ${monthName(
    date.getMonth()
  )} ${date.getFullYear()}`;

  useEffect(() => {
    // fetchUserWatchlists(authCtx.userid).then((snapshot) => {
    //   const data = snapshot.val();
    //   let watchlists = {};
    //   if (data) {
    //     watchlists = {};
    //     for (const key in data) {
    //       const watchlist = {
    //         id: key,
    //         ...data[key],
    //       };
    //       watchlists[key] = watchlist;
    //
    //     }
    //   }
    //filter out movies from each watchlist with property myday
    const watchlists = watchlistCtx.watchlists;
    const mydayMovies = [];
    for (const key in watchlists) {
      const watchlist = watchlists[key];
      for (const movieId in watchlist.movies) {
        const movie = watchlist.movies[movieId];
        if (movie.myDay === true) {
          mydayMovies.push(movie);
        }
      }
    }
    let movies, watchedMovies;
    if (mydayMovies.length > 0) {
      movies = mydayMovies.filter((movie) => {
        return movie.watched === false || movie.watched === undefined;
      });
      watchedMovies = mydayMovies.filter((movie) => {
        return movie.watched === true;
      });
    } else {
      movies = mydayMovies;
      watchedMovies = [];
    }
    setmydayMovies(movies);
    setWatched(watchedMovies);

    // });
  }, [authCtx.userid, watchlistCtx.watchlists]);
  const onchangeHandler = (movieId, movies) => {
    setmydayMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== Number(movieId))
    );
    const watchedMovie = mydayMovies.filter(
      (movie) => movie.id === Number(movieId)
    );
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
    //get the watchlist id from the movie object
    const movie = movies.filter((movie) => movie.id === Number(movieId));
    const temp = movie.map((movie) => movie.watchlistId);
    const iterator = temp.values();
    const watchlistId = iterator.next().value;

    watchlistCtx.markMovAsWatched(movieId, watchlistId);
  };

  return (
    <>
      <section className={styles.pagetitle}>
        <h1>My Day</h1>
        <p>{fullDate}</p>
      </section>
      {mydayMovies.length === 0 && (
        <Banner>Well done you have watched all movies in your My day</Banner>
      )}
      {mydayMovies.length >= 0 && (
        <section className={styles.initial}>
          {mydayMovies.length > 0 && <h4 className={styles.tag}>To Watch</h4>}
          <MovieItems
            movies={mydayMovies}
            onchangeHandler={onchangeHandler}
            // handleResultClick={handleResultClick}
            radio={true}
            // params={watchlistId}
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
            // params={watchlistId}
          ></MovieItems>
        </section>
      )}
    </>
  );
};

export default MyDay;
