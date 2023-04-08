import React from "react";
import styles from "./Poster.module.css";
import blankposter from "../../Images/blank-profile-picture-973460_1280.webp";
const Poster = (props) => {
  const src = props.movie ? props.movie.poster_path : props.cast.profile_path;
  const title = props.movie ? props.movie.title : props.cast.name;
  const imgStyling = props.className
    ? props.className + " " + styles.posterimg
    : styles.posterimg;
  const imageElement = (
    <img
      className={imgStyling}
      src={`https://image.tmdb.org/t/p/original${src}`}
      alt={`poster of ${title}`}
    />
  );
  const noImageElement = (
    <img className={imgStyling} src={blankposter} alt={title} />
  );
  const image =
    src !== null && src !== undefined && src !== ""
      ? imageElement
      : noImageElement;

  return <>{image}</>;
};
export default Poster;
