import React from "react";
import styles from "./MovieItems.module.css";
import SearchResult from "../SearchResult/SearchResult";
const MovieItems = (props) => {
  // console.log("MovieItems received props:", props);
  // props.movies.map((movie, index) => console.log("Movie ID:", movie.id));

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className={styles.li} key={index}>
          {/* <hr></hr> */}
          <div className={styles.listitem}>
            {props.radio === true && (
              <>
                <label className={styles.custom_radio}> </label>
                <input
                  type="radio"
                  value={movie.id}
                  name={`movie-${movie.id}`}
                  onChange={props.onchangeHandler}
                ></input>
                {/* <span className={styles.checkmark}></span> */}
              </>
            )}

            <div onClick={() => props.handleResultClick(movie.id, movie)}>
              <SearchResult movie={movie}></SearchResult>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default MovieItems;
