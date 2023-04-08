import { React } from "react";
import styles from "./MovieBackdrop.module.css";
const MovieBackdrop = (props) => {
  return (
    <div className={styles.movie_backdrop}>
      <img
        className={styles.backdropimg}
        src={`https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`}
        alt={props.title}
      />
    </div>
  );
};
export default MovieBackdrop;
