import React from "react";
import { Fragment, useState, useEffect } from "react";
import Button from "../Components/UI/Button";
import styles from "./MyLists.module.css";
import MovieCarouselView from "../Components/MovieCarouselView/MoviePosterCarouselView";
import { useNavigate } from "react-router-dom";

const MyLists = () => {
  const [showEmptyWatchlist] = useState(false);
  const [showWatchlists] = useState(true);
  const [popularMovies, setPopularMovies] = useState([]);
  const navigate = useNavigate();
  const onClickHandler = () => {
    console.log("clicked");
    navigate("/createwatchlist");
  };

  const API_KEY = "e418fdbca3c905f8b53cababd0a32c2f";
  useEffect(() => {
    //Fetch popular movies
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Fragment>
      <div className={styles.watchlisttitle}>
        <h1>My Lists</h1>
        <Button className={styles.watchlistbutton} onClick={onClickHandler}>
          + New Watchlist
        </Button>
      </div>

      {showEmptyWatchlist && (
        <div>
          <p>You don't have any watchlists. Create new watchlists</p>
        </div>
      )}
      {showWatchlists && (
        <>
          {[
            {
              title: "Popular Movies",
              movies: popularMovies,
              movieCount: popularMovies.length,
              type: "watchlist",
              className: styles.mylistimg,
            },
            {
              title: "Top Rated Movies",
              movies: popularMovies,
              movieCount: popularMovies.length,
              type: "watchlist",
              className: styles.mylistimg,
            },
            {
              title: "Action Movies",
              movies: popularMovies,
              movieCount: popularMovies.length,
              type: "watchlist",
              className: styles.mylistimg,
            },
            // Add more objects here with the data for each MovieCarouselView component
          ].map((carouselData, index) => (
            <MovieCarouselView
              key={index}
              title={carouselData.title}
              movies={carouselData.movies}
              movieCount={carouselData.movieCount}
              type={carouselData.type}
              className={carouselData.className}
            />
          ))}
        </>
      )}
    </Fragment>
  );
};
export default MyLists;
