import React, { useEffect, useState, useContext } from "react";
import styles from "./MyPlanned.module.css";
// import { plannedMovies } from "../Utils/utils";
import MovieItems from "../Components/MovieItems/MovieItems";
import Banner from "../Components/UI/Banner";
import { fetchUserWatchlists } from "../Services/Watchlist.service";
import AuthContext from "../Store/auth-context";
import WatchlistContext from "../Store/watchlist-context";

const MyPlanned = () => {
  const authCtx = useContext(AuthContext);
  const watchlistCtx = useContext(WatchlistContext);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const onchangeHandler = (movieId, movies) => {
    // delete movie from the movie array

    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== Number(movieId))
    );
    // add movie to the watched array
    const watchedMovie = movies.filter((movie) => movie.id === Number(movieId));
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
    const movie = movies.filter((movie) => movie.id === Number(movieId));
    const temp = movie.map((movie) => movie.watchlistId);
    const iterator = temp.values();
    const watchlistId = iterator.next().value;
    watchlistCtx.markMovAsWatched(movieId, watchlistId);
  };
  const handleResultClick = (id, movie) => {
    console.log(id);
  };

  useEffect(() => {
    fetchUserWatchlists(authCtx.userid).then((snapshot) => {
      const data = snapshot.val();
      let watchlists = {};
      if (data) {
        watchlists = {};
        for (const key in data) {
          const watchlist = {
            id: key,
            ...data[key],
          };
          watchlists[key] = watchlist;
        }
      }
      //filter out movies from each watchlist with property myday
      const myPlannedMovies = [];
      for (const key in watchlists) {
        const watchlist = watchlists[key];
        for (const movieId in watchlist.movies) {
          const movie = watchlist.movies[movieId];
          if (movie.plannedDate) {
            myPlannedMovies.push(movie);
          }
        }
      }
      let movies, watchedMovies;
      if (myPlannedMovies.length > 0) {
        movies = myPlannedMovies.filter((movie) => {
          return movie.watched === false || movie.watched === undefined;
        });
        watchedMovies = myPlannedMovies.filter((movie) => {
          return movie.watched === true;
        });
      } else {
        movies = myPlannedMovies;
        watchedMovies = [];
      }

      setWatched(watchedMovies);
      setMovies(movies);
    });
  }, [authCtx.userid]);

  const groupMoviesByWatchDate = (movies) => {
    return movies.reduce((acc, cur) => {
      if (acc[cur.plannedDate]) {
        acc[cur.plannedDate].push(cur);
      } else {
        acc[cur.plannedDate] = [cur];
      }
      return acc;
    }, {});
  };
  const groupedMovies = groupMoviesByWatchDate(movies);

  const renderedMovies = Object.keys(groupedMovies).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return (
    <>
      <section className={styles.pagetitle}>
        <h1>My Planned Movies</h1>
      </section>
      {movies.length === 0 && (
        <Banner>
          Well done you have watched all movies in your My Planned
        </Banner>
      )}
      {renderedMovies.map((watchDate) => (
        <section
          key={`${watchDate}+ ${Math.random(1000)}`}
          className={styles.datedivs}
        >
          <h4 className={styles.tag}>{watchDate}</h4>
          <MovieItems
            movies={groupedMovies[watchDate]}
            onchangeHandler={onchangeHandler}
            handleResultClick={handleResultClick}
            radio={true}
          ></MovieItems>
        </section>
      ))}
      <section className={styles.watched}>
        {watched.length > 0 && <h4 className={styles.tag}>Watched</h4>}
        <MovieItems
          movies={watched}
          onchangeHandler={onchangeHandler}
          handleResultClick={handleResultClick}
          radio={false}
        ></MovieItems>
      </section>
    </>
  );
};
export default MyPlanned;
