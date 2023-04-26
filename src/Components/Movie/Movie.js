import React, { useState } from "react";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import styles from "./Movie.module.css";
import CastCarouselView from "../CastCarousel/CastCarouselView";
import Poster from "../Poster/Poster";
import MovieReviewText from "./MovieReviewText";
import Streaming from "./Streaming";
import MovieCarouselView from "../MovieCarouselView/MovieCarouselView";
import Modal from "../UI/Modal/Modal";
const Movie = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMovie, setModalMovie] = useState([]);

  const starStyling = `fa fa-star ${styles.checked}`;
  const runtime = formatRuntime(props.movie.runtime);
  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
  const director = props.crew.filter((crew) => crew.job === "Director")[0].name;
  let language = props.movie.original_language.toUpperCase();
  const movieTitle = `${props.movie.title} (${props.movie.release_date.slice(
    0,
    4
  )})`;
  const trailer = props.trailer.results.filter(
    (trailer) => trailer.type === "Trailer"
  );

  switch (language) {
    case "EN":
      language = "English";
      break;
    case "FR":
      language = "French";
      break;
    case "DE":
      language = "German";
      break;
    case "ES":
      language = "Spanish";
      break;
    case "IT":
      language = "Italian";
      break;
    case "JA":
      language = "Japanese";
      break;
    case "KO":
      language = "Korean";
      break;
    case "ZH":
      language = "Chinese";
      break;
    case "PT":
      language = "Portuguese";
      break;
    default:
      language = "Unknown";
  }

  const languages = language;
  const genres = props.movie.genres
    .reduce((acc, genre) => {
      return acc + genre.name + ", ";
    }, "")
    .slice(0, -2);
  const handleAddToWatchlist = (movie) => {
    setShowModal(true);
    setModalMovie(movie);
  };
  const modalonCloseHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <Modal modalMovie={modalMovie} onClose={modalonCloseHandler}></Modal>
      )}
      <div className={styles.movie_detail}>
        <div className={styles.movie_detail_top}>
          <Poster movie={props.movie} className={styles.movie_detail_poster} />
          <MovieBackdrop movie={props.movie} />
        </div>
        <div className={styles.movie_detail_content}>
          <div className={styles.movie_detail_left}>
            <h2>{movieTitle}</h2>
            <p>{runtime}</p>
            <h3 className={styles.sTitle}>
              <span className={starStyling}></span>
              {props.movie.vote_average}
            </h3>
            <p>{props.movie.vote_count}</p>

            <h4 className={styles.sTitle}>GENRES</h4>
            <p>{genres}</p>
            <h4 className={styles.sTitle}>OVERVIEW</h4>
            <p>{props.movie.overview}</p>
          </div>

          <div className={styles.movie_detail_right}>
            <h4 className={styles.sTitle}>DIRECTOR</h4>
            <p>{director}</p>
            <h4 className={styles.sTitle}>STATUS</h4>
            <p>{props.movie.status}</p>
            <h4 className={styles.sTitle}>LANGUAGE</h4>
            <p>{languages}</p>
          </div>
        </div>

        {Object.keys(props.watchProviders.results.US) && (
          <Streaming watchProviders={props.watchProviders} />
        )}
        <section>
          <h4 className={styles.sTitle}>TOP CAST</h4>
          <CastCarouselView cast={props.cast} />
        </section>
        <hr></hr>
        <div className={styles.movie_detail_content}>
          <div className={styles.moviebottom_detail_left}>
            <h4 className={styles.sTitle}>REVIEWS</h4>
            {props.reviews.results.length === 0 && (
              <p>There are no reviews for this movie yet.</p>
            )}
            {props.reviews.results.map((review) => {
              return (
                <div key={review.id}>
                  <h4 className={styles.sTitle}>
                    Review By{" "}
                    <span className={styles.authorname}>{review.author}</span>
                  </h4>
                  <MovieReviewText review={review} />
                  <hr></hr>
                </div>
              );
            })}
          </div>
          <div className={styles.moviebottom_detail_right}>
            <h4 className={styles.sTitle}>TRAILERS</h4>
            {trailer.length === 0 && (
              <p>There are no trailers for this movie</p>
            )}
            {trailer.map((trailer, index) => {
              return (
                <div key={index}>
                  <h4 className={styles.sTitle}>Watch {trailer.name}</h4>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    width="560"
                    height="315"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>
        <MovieCarouselView
          title="Movies you might like"
          movies={props.similar}
          movieCount={props.similar.length}
          onAddToWatchlist={handleAddToWatchlist}
          type="movie"
          parent="home"
        />
      </div>
    </>
  );
};
export default React.memo(Movie);
