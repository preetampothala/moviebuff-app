import React from "react";
import styles from "./SearchResult.module.css";
import Poster from "../Poster/Poster";
import Card from "../Card/Card";
import { getGenres } from "../../Utils/utils";
const SearchResult = (props) => {
  const starStyling = `fa fa-star ${styles.checked}`;
  const releasedate = props.movie.release_date
    ? `(${props.movie.release_date.slice(0, 4)})`
    : "";
  const title =
    releasedate === ""
      ? props.movie.title
      : props.movie.title + " " + releasedate;
  const vote = props.movie.vote_average
    ? props.movie.vote_average.toFixed(1)
    : "";
  const overview = props.movie.overview ? props.movie.overview : "";

  const genres = props.movie.genre_ids ? getGenres(props.movie.genre_ids) : "";
  return (
    <Card>
      <div className={styles.searchresult}>
        <Poster movie={props.movie} className={styles.search_poster}></Poster>
        <div className={styles.searchresult_right}>
          <div>
            <h3 className={styles.title}>{title}</h3>
            {vote && (
              <div>
                <span className={starStyling}></span>
                {vote}
              </div>
            )}
            <p className={styles.overview}>{overview}</p>
          </div>
          <p>{genres}</p>
        </div>
      </div>
    </Card>
  );
};
export default SearchResult;
