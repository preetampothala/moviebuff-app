import React from "react";
import styles from "./MovieItems.module.css";
import SearchResult from "../SearchResult/SearchResult";
import Button from "../UI/Button";
const MovieItems = (props) => {
  // console.log("MovieItems received props:", props);
  // props.movies.map((movie, index) => console.log("Movie ID:", movie.id));
  const handleButtonClick = (movieId) => {
    props.onchangeHandler(movieId);
  };
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className={styles.li} key={index}>
          <div className={styles.listitem}>
            {props.radio === true && (
              <>
                <div className={styles.custom_radio}>
                  <Button
                    className={styles.button}
                    onClick={() => handleButtonClick(movie.id)}
                    value={movie.id}
                  >
                    <span className={`material-icons-outlined`}>done</span>
                  </Button>
                </div>
                {/* <span className={styles.checkmark}></span> */}
              </>
            )}

            {/* <div onClick={() => props.handleResultClick(movie.id, movie)}>
              <SearchResult movie={movie}></SearchResult>
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
};
export default MovieItems;
