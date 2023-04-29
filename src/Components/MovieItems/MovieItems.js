import React from "react";
import styles from "./MovieItems.module.css";
import SearchResult from "../SearchResult/SearchResult";
import { Link } from "react-router-dom";
const MovieItems = (props) => {
  const handleButtonClick = (event) => {
    props.onchangeHandler(event.target.value, props.movies);
  };

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className={styles.li} key={index}>
          <div className={styles.listitem}>
            {props.parent !== "plists" && props.radio === true && (
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
            {props.parent === "mylists" ? (
              <Link
                to={`/watchlist/${props.params}/${movie.id}`}
                state={{
                  movie: movie,
                  watched: props.watched,
                  parent: props.parent,
                  watchlist: props.watchlist,
                  date: props.date,
                  params: props.params,
                  count: props.count,
                  dateCreated: props.dateCreated,
                }}
              >
                <SearchResult movie={movie}></SearchResult>
              </Link>
            ) : (
              <Link to={`/movies/${movie.id}`}>
                <SearchResult
                  movie={movie}
                  parent={props.parent}
                ></SearchResult>
              </Link>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
export default MovieItems;
