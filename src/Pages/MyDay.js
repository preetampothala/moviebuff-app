import React, { useEffect, useState } from "react";
import { dayName, monthName } from "../Utils/utils";
import Banner from "../Components/UI/Banner";
import styles from "./MyDay.module.css";
import MovieItems from "../Components/MovieItems/MovieItems";

const MyDay = () => {
  const [mydayMovies, setmydayMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const date = new Date();
  const fullDate = `${dayName(date.getDay())}, ${date.getDate()} ${monthName(
    date.getMonth()
  )} ${date.getFullYear()}`;

  useEffect(() => {
    if (!localStorage.getItem("myday")) {
      localStorage.setItem("myday", JSON.stringify([]));
    } else {
      const myday = JSON.parse(localStorage.getItem("myday"));
      setmydayMovies(myday);
    }
  }, []);
  const onchangeHandler = (movieId) => {
    setmydayMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== Number(movieId))
    );
    const watchedMovie = mydayMovies.filter(
      (movie) => movie.id === Number(movieId)
    );
    setWatched((prevWatched) => [...prevWatched, ...watchedMovie]);
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
