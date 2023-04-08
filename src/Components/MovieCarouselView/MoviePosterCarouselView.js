import { React, useRef, useState } from "react";
import MoviePoster from "../MoviePoster/MoviePoster";
import styles from "./MovieCarouselView.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

function MovieCarouselView(props) {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const imgStyling = props.className ? props.className : styles.img;
  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollDistance = container.offsetWidth;
    container.scrollTo({
      left: container.scrollLeft + direction * scrollDistance,
      right: container.scrollRight + direction * scrollDistance,
      behavior: "smooth",
    });

    setShowLeftButton(container.scrollLeft > -10);
    setShowRightButton(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  };
  const editHandler = () => {
    console.log("edit");
  };

  return (
    <div className={styles.movie_side_scroll}>
      {/* <div className={styles.title}> */}
      <h2>{props.title}</h2>
      <div className={styles.titletwo}>
        {props.movieCount > 0 && (
          <p>
            {props.movieCount} {props.movieCount > 1 ? "movies" : "movie"}
          </p>
        )}
        {props.type === "watchlist" && (
          <Button className={styles.editbutton} onCLick={editHandler}>
            Edit
          </Button>
        )}
      </div>
      {/* </div> */}
      <hr />

      {/* <hr className="solid"></hr> */}
      <div className={styles.carousel_container}>
        <div className={styles.carousel_nav}>
          <Button
            className={`${styles.carousel_nav_button} ${styles.left_nav_button}`}
            onClick={() => handleScroll(-1)}
            disabled={!showLeftButton}
          >
            <span className="material-icons">arrow_back_ios</span>
          </Button>

          <Button
            className={`${styles.carousel_nav_button} ${styles.right_nav_button}`}
            onClick={() => handleScroll(1)}
            disabled={!showRightButton}
          >
            <span className="material-icons">arrow_forward_ios</span>
          </Button>
        </div>
        <div className={styles.movie_posters} ref={scrollRef}>
          {props.movies.map((movie) => (
            <div key={movie.id} className={styles.posterimg}>
              <MoviePoster
                movie={movie}
                onAddToWatchlist={props.onAddToWatchlist}
                className={imgStyling}
                type={props.type}
              />

              <Link to={`/movies/${movie.id}`} className={styles.link}>
                <h4 className={styles.multiline}>{movie.title}</h4>
              </Link>

              {/* <a href={`/movies/${movie.id}`} className={styles.link}>
                {movie.title}
              </a> */}
              {/* <Button
                className={styles.plusbutton}
                onClick={() => props.onAddToWatchlist(movie)}
              >
                +
              </Button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCarouselView;
