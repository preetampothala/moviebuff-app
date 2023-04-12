import React, { useState, useEffect } from "react";
import styles from "./MovieItems.module.css";
import SearchResult from "../SearchResult/SearchResult";

import { Link } from "react-router-dom";
const MovieItems = (props) => {
  const handleButtonClick = (event) => {
    props.onchangeHandler(event.target.value);
  };
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    if (props.watched) {
      if (props.watched.length > 0) {
        setWatched(props.watched);
      } else {
        setWatched([]);
      }
    } else {
      return;
    }
  }, [props.watched]);

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className={styles.li} key={index}>
          <div className={styles.listitem}>
            {props.radio === true && (
              <>
                <label htmlFor={movie.id} className={styles.custom_radio}>
                  <input
                    type="radio"
                    name={movie.id}
                    value={movie.id}
                    className={styles.input}
                    onClick={handleButtonClick}
                  />
                </label>
              </>
            )}

            {/* <div onClick={() => props.handleResultClick(movie.id, movie)}>
              <SearchResult movie={movie}></SearchResult>
            </div> */}
            <Link
              to={`/watchlist/${props.params}/${movie.id}`}
              state={{
                movie: movie,
                watched: watched,
              }}
            >
              <SearchResult movie={movie}></SearchResult>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
export default MovieItems;
