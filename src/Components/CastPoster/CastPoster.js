import React from "react";
import styles from "./CastPoster.module.css";
import blankposter from "../../Images/blank-profile-picture-973460_1280.webp";
function MoviePoster(props) {
  const imgStyling = props.className ? props.className : styles.posterimg;
  const imageElement = (
    <img
      className={imgStyling}
      src={`https://image.tmdb.org/t/p/w500${props.cast.profile_path}`}
      alt={props.cast.name}
    />
  );
  const noImageElement = (
    <img className={imgStyling} src={blankposter} alt={props.cast.name} />
  );
  const image = props.cast.profile_path ? imageElement : noImageElement;

  return (
    <div className={styles.container}>
      {image}
      <h4>{props.cast.name}</h4>
      <p className={styles.charactername}>{props.cast.character}</p>
    </div>
  );
}

export default MoviePoster;
