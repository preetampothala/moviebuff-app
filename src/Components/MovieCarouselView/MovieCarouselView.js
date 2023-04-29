import { React, useRef, useState, useEffect } from "react";
import MoviePoster from "../MoviePoster/MoviePoster";
import styles from "./MovieCarouselView.module.css";
import Button from "../UI/Button";
import { Link, useNavigate } from "react-router-dom";

function MovieCarouselView(props) {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const navigate = useNavigate();
  const imgStyling = props.className ? props.className : styles.img;
  useEffect(() => {
    const container = scrollRef.current;
    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  }, []);
  const handleScroll = (direction) => {
    const container = scrollRef.current;

    const scrollDistance = container.offsetWidth;
    container.scrollTo({
      left: container.scrollLeft + (direction * scrollDistance) / 2,
      // right: container.scrollRight + (direction * scrollDistance) / 2,
      behavior: "smooth",
    });

    setTimeout(() => {
      setShowLeftButton(container.scrollLeft > 0.5);
      setShowRightButton(
        container.scrollLeft + container.offsetWidth < container.scrollWidth
      );
    }, 300);
  };
  const leftButtonStyles = showLeftButton
    ? `${styles.carousel_nav_button}`
    : `${styles.carousel_nav_button} ${styles.disabled}`;
  const rightButtonStyles = showRightButton
    ? `${styles.carousel_nav_button}`
    : `${styles.carousel_nav_button} ${styles.disabled}`;
  const editHandler = () => {
    navigate("/editwatchlist/" + props.watchlistId, {
      state: { watchlist: props },
    });
  };
  return (
    <div className={styles.movie_side_scroll}>
      {props.parent === "mylists" || props.parent === "plists" ? (
        <Link
          to={`/watchlist/${props.watchlistId}`}
          state={{
            pwatchlist: props,
            parent: props.parent,
            watchlistId: props.watchlistId,
            count: props.movieCount,
            dateCreated: props.dateCreated,
          }}
          className={styles.link}
        >
          {props.parent === "plists" ? (
            <div className={styles.plistby}>
              <h2
                className={styles.watchlistname}
              >{`${props.watchlistName} `}</h2>
              <span className={styles.authorname}>by {props.createdBy}</span>
            </div>
          ) : (
            <h2>{props.watchlistName}</h2>
          )}
        </Link>
      ) : (
        <h2>{props.title}</h2>
      )}

      <div className={styles.titletwo}>
        {props.movieCount > 0 && (
          <p className={styles.paragraph}>
            {props.movieCount} {props.movieCount > 1 ? "movies" : "movie"}
          </p>
        )}
        {props.type === "watchlist" && (
          <Button className={styles.editbutton} onClick={editHandler}>
            Edit
          </Button>
        )}
      </div>
      {props.parent === "plists" && (
        <p className={styles.paragraph}>{props.watchlistDescription}</p>
      )}
      <hr />

      <div className={styles.carousel_nav}>
        <Button
          className={leftButtonStyles}
          onClick={() => handleScroll(-1)}
          disabled={!showLeftButton}
        >
          <span className="material-icons">chevron_left</span>
        </Button>

        <Button
          className={rightButtonStyles}
          onClick={() => handleScroll(1)}
          disabled={!showRightButton}
        >
          <span className="material-icons">chevron_right</span>
        </Button>
      </div>
      <div className={styles.movie_posters} ref={scrollRef}>
        {props.movies.map((movie) => (
          <div key={movie.id}>
            <MoviePoster
              movie={movie}
              onAddToWatchlist={props.onAddToWatchlist}
              className={imgStyling}
              type={props.type}
            />

            <Link to={`/movies/${movie.id}`} className={styles.link}>
              <h4 className={styles.multiline}>{movie.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieCarouselView;
