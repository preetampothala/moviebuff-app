import React from "react";
import { Link } from "react-router-dom";
import styles from "./MoviePoster.module.css";
import Button from "../UI/Button";

function MoviePoster(props) {
  const imgStyling = props.className ? props.className : styles.posterimg;
  return (
    <div className={styles.container}>
      <Link to={`/movies/${props.movie.id}`} className={styles.link}>
        <div className={styles.overlay}></div>
        <img
          className={imgStyling}
          src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
          alt={props.movie.title}
        />
        {/* {props.type === "movie" && (
          <h3 className={styles.multiline}>{props.movie.title}</h3>
        )} */}
      </Link>

      {props.type === "movie" && (
        <Button
          className={styles.plusbutton}
          onClick={() => props.onAddToWatchlist(props.movie)}
        >
          +
        </Button>
      )}
    </div>
  );
}

export default React.memo(MoviePoster);
