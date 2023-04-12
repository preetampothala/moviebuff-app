import React, { useEffect, useState } from "react";
import styles from "./MyPlanned.module.css";
import { plannedMovies } from "../Utils/utils";
import MovieItems from "../Components/MovieItems/MovieItems";
import Banner from "../Components/UI/Banner";

const MyPlanned = () => {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const onchangeHandler = (movieId) => {
    // delete movie from the movie array
    const newMovie = movies.filter((movie) => movie.id !== Number(movieId));

    setMovies(newMovie);
    // add movie to the watched array
    const watchedMovie = movies.filter((movie) => movie.id === Number(movieId));
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
  };
  const handleResultClick = (id, movie) => {
    console.log(id);
  };

  useEffect(() => {
    const newinfo = plannedMovies;
    if (newinfo) {
      setMovies(newinfo);
    }
  }, []);

  const groupMoviesByWatchDate = (movies) => {
    return movies.reduce((acc, cur) => {
      if (acc[cur.date]) {
        acc[cur.date].push(cur);
      } else {
        acc[cur.date] = [cur];
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
