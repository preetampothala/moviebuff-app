import React, { Fragment, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Watchlist.module.css";
import Banner from "../Components/UI/Banner";
import Button from "../Components/UI/Button";
import MovieItems from "../Components/MovieItems/MovieItems";
import WatchlistContext from "../Store/watchlist-context";
import AuthContext from "../Store/auth-context";
import { fetchWatchlist } from "../Services/Watchlist.service";
import Alert from "../Components/UI/Alert";

const Watchlist = () => {
  const watchlistCtx = useContext(WatchlistContext);
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const [watchlist, setWatchlist] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { pwatchlist, parent, watchlistId, count, dateCreated } =
    location.state || {};

  // const { pwatchlist, parent, watchlistId } = location.state || {};
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const onchangeHandler = (movieId) => {
    setMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== Number(movieId))
    );
    const watchedMovie = movies.filter((movie) => movie.id === Number(movieId));
    setWatchedMovies((prevWatched) => [...prevWatched, ...watchedMovie]);
    watchlistCtx.markMovAsWatched(movieId, watchlist.watchlistId);
  };
  const onClickHandler = () => {
    watchlistCtx.importWatList(watchlist, watchlist.watchlistId);
    setShowAlert(true);
    setAlertText("Watchlist imported successfully");
  };
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const date = formatDate(new Date(watchlist.dateCreated));
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    //fetch watchlist from firebase with watchlistId
    //set movies to state
    //set watched movies to state
    let userId;
    if (parent === "mylists") {
      userId = authCtx.userid;
    } else {
      userId = pwatchlist.userId;
    }
    fetchWatchlist(watchlistId, userId).then((snapshot) => {
      const data = snapshot.val();

      if (data) {
        const watchlist = {
          ...data,
        };
        setWatchlist(watchlist);

        let watchlistMovies = [];
        for (const key in watchlist.movies) {
          const movie = {
            id: key,
            ...watchlist.movies[key],
          };
          watchlistMovies.push(movie);
        }

        let movies, watchedMovies;
        if (parent === "mylists") {
          movies = watchlistMovies.filter((movie) => {
            return movie.watched === false || movie.watched === undefined;
          });
          watchedMovies = watchlistMovies.filter((movie) => {
            return movie.watched === true;
          });
        } else {
          movies = pwatchlist.movies;
          watchedMovies = [];
        }
        setAllMovies(watchlistMovies);
        setMovies(movies);
        setWatchedMovies(watchedMovies);
      }
    });
  }, [authCtx.userid, watchlistId, parent, pwatchlist]);
  // useEffect(() => {
  //   let movies, watchedMovies;
  //   if (parent === "mylists") {
  //     movies = watchlist.movies.filter((movie) => {
  //       return movie.watched === false || movie.watched === undefined;
  //     });
  //     watchedMovies = watchlist.movies.filter((movie) => {
  //       return movie.watched === true;
  //     });
  //   } else {
  //     movies = watchlist.movies;
  //     watchedMovies = [];
  //   }
  //   setMovies(movies);
  //   setWatchedMovies(watchedMovies);
  // }, [watchlist.movies, parent]);

  return (
    <Fragment>
      {showAlert && (
        <Alert show={showAlert} onClose={handleAlertClose}>
          {alertText}
        </Alert>
      )}
      <section>
        <div className={styles.watchlisttitle}>
          <div className={styles.watchlisttitle}>
            <h1 className={styles.titlename}>{watchlist.watchlistName}</h1>
            <p>{`${allMovies.length} movies`}</p>
          </div>
          {parent === "plists" && (
            <Button className={styles.watchlistbutton} onClick={onClickHandler}>
              Import Watchlist
            </Button>
          )}
        </div>
        <p>{`Created: ${date}`}</p>
        <p className={styles.watchlist_description}>
          {watchlist.watchlistDescription}
        </p>
      </section>
      {movies.length === 0 && (
        <Banner>Well done you have watched all movies in your watchlist</Banner>
      )}
      {movies.length > 0 && (
        <section className={styles.initial}>
          {movies.length > 0 && parent === "mylists" && (
            <h4 className={styles.tag}>To Watch</h4>
          )}
          <MovieItems
            parent={parent}
            movies={movies}
            onchangeHandler={onchangeHandler}
            radio={true}
            params={watchlistId}
            watchlist={watchlist}
            date={date}
            count={count}
            dateCreated={dateCreated}
          ></MovieItems>
        </section>
      )}

      {watchedMovies.length > 0 && (
        <section className={styles.watched}>
          <h4 className={styles.tag}>Watched</h4>
          <MovieItems
            movies={watchedMovies}
            radio={false}
            parent={parent}
            watchlist={watchlist}
            params={watchlistId}
            watched={"watched"}
            count={count}
            dateCreated={dateCreated}
          ></MovieItems>
        </section>
      )}
    </Fragment>
  );
};
export default Watchlist;
