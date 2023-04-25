import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import SearchResults from "../../Pages/SearchResults";
import SearchResult from "../SearchResult/SearchResult";
import AuthContext from "../../Store/auth-context";
import useValidate from "../../hooks/use-validation";
import useInput from "../../hooks/use-input";
import styles from "../WatchlistForm/WatchlistForm.module.css";
import WatchlistContext from "../../Store/watchlist-context";
const WatchlistForm = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const watchlistDescriptionInputRef = useRef();
  const watchlistNameInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const watchlistCtx = useContext(WatchlistContext);
  const { mode } = props;
  const { watchlistData } = props;

  const {
    value: watchlistName,
    isValid: watchlistNameIsValid,
    hasError: watchlistNameHasError,
    valueChangeHandler: watchlistNameChangeHandler,
    inputBlurHandler: watchlistNameBlurHandler,
    reset: resetWatchlistname,
  } = useInput((value) => typeof value === "string" && value.trim() !== "");
  const {
    value: watchlistDescription,
    isValid: watchlistDescriptionIsValid,
    hasError: watchlistDescriptionHasError,
    valueChangeHandler: watchlistDescriptionChangeHandler,
    inputBlurHandler: watchlistDescriptionBlurHandler,
    reset: resetWatchlistdescription,
  } = useInput((value) => typeof value === "string" && value.trim() !== "");

  const {
    movies: addedMovies,
    addedMoviesIsValid,
    addedMoviesHasError,
    addMovieHandler: setAddedMovies,
    resetAddedMovies,
    removeMovieHandler,
    inputBlurHandler: movieSearchBlurHandler,
  } = useValidate((addedMovies) => addedMovies.length > 0);
  useEffect(() => {
    if (mode === "edit") {
      resetWatchlistname(watchlistData.watchlistName);
      resetWatchlistdescription(watchlistData.watchlistDescription);
      resetAddedMovies(watchlistData.movies);
    }
  }, [
    mode,
    watchlistData,
    resetWatchlistname,
    resetWatchlistdescription,
    resetAddedMovies,
  ]);

  // useEffect(() => {
  //   if (existingmovie) {
  //     setAddedMovies(existingmovie);
  //   }
  // }, [existingmovie, setAddedMovies]);

  let formIsValid = false;
  if (
    watchlistNameIsValid &&
    watchlistDescriptionIsValid &&
    addedMoviesIsValid
  ) {
    formIsValid = true;
  }
  const buttonClasses = formIsValid
    ? styles.watchlistbutton
    : `${styles.watchlistbutton} ${styles.watchlistbutton_disabled}`;
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchInputRef.current.value);
  };

  const handleResultClick = (movie) => {
    setAddedMovies(movie);
    setSearchTerm("");
  };
  const removeMovie = (movieId) => {
    console.log("removing movie");
    removeMovieHandler(movieId);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const watchlistName = watchlistNameInputRef.current.value;
    const watchlistDescription = watchlistDescriptionInputRef.current.value;

    const date = new Date();
    const dateCreated = date.toISOString().trim().split("T")[0];
    //use first 3 letters of watchlistName and a random number to create a unique id

    if (mode === "create") {
      const watchlistId =
        watchlistName.replace(/\s/g, "") + Math.floor(Math.random() * 10000);
      const movies = addedMovies.reduce((acc, movie) => {
        // add watchlistId to each movie
        movie.watchlistId = watchlistId;
        acc[movie.id] = movie;
        movie.watched = false;
        return acc;
      }, {});
      console.log(authCtx.username);
      const watchlist = {
        userId: authCtx.userid,
        createdBy: authCtx.username,
        watchlistName: watchlistName,
        watchlistId: watchlistId,
        watchlistDescription: watchlistDescription,
        movies: movies,
        dateCreated: dateCreated,
      };
      // createWatchlist(watchlist, watchlistId, authCtx.userid);
      watchlistCtx.addNewWatchlist(watchlist, watchlistId);
    }
    if (mode === "edit") {
      const movies = addedMovies.reduce((acc, movie) => {
        // add watchlistId to each movie
        movie.watchlistId = watchlistData.watchlistId;
        movie.watched = movie.watched ? movie.watched : false;
        acc[movie.id] = movie;
        return acc;
      }, {});
      console.log(authCtx.username);
      const watchlist = {
        userId: authCtx.userid,
        createdBy: authCtx.username,
        watchlistId: watchlistData.watchlistId,
        watchlistName: watchlistName,
        watchlistDescription: watchlistDescription,
        movies: movies,
        dateCreated: watchlistData.dateCreated,
      };
      const editedwatchlistId = watchlistData.watchlistId;
      console.log(watchlist, editedwatchlistId, authCtx.userid);
      // updateWatchlist(watchlist, editedwatchlistId, authCtx.userid);
      watchlistCtx.updatecurrentWatchlist(watchlist, editedwatchlistId);
    }

    resetWatchlistname();
    resetWatchlistdescription();
    resetAddedMovies();
    navigate("/watchlist");
  };
  return (
    <div className={styles.createwatchlist}>
      {mode === "edit" ? (
        <h1>Edit Watchlist</h1>
      ) : (
        <h1>Create New Watchlist</h1>
      )}
      <form className={styles.createwatchlist} onSubmit={handleFormSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="watchlistName" className={styles.label}>
            Watchlist Name
          </label>
          <input
            type="text"
            id="watchlistName"
            name="watchlistName"
            onChange={watchlistNameChangeHandler}
            className={styles.input}
            ref={watchlistNameInputRef}
            onBlur={watchlistNameBlurHandler}
            value={watchlistName}
          />
          {watchlistNameHasError && (
            <span className={styles.error_text}>
              Watchlist name is required.
            </span>
          )}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="watchlistDescription" className={styles.label}>
            Watchlist Description
          </label>
          <input
            type="text"
            id="watchlistDescription"
            name="watchlistDescription"
            onChange={watchlistDescriptionChangeHandler}
            className={styles.input}
            onBlur={watchlistDescriptionBlurHandler}
            ref={watchlistDescriptionInputRef}
            value={watchlistDescription}
          />
          {watchlistDescriptionHasError && (
            <span className={styles.error_text}>
              Watchlist description is required.
            </span>
          )}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="search" className={styles.label}>
            Search Movies
          </label>
          <div>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search for a movie"
              ref={searchInputRef}
              onChange={handleSearch}
              className={styles.input}
              onBlur={movieSearchBlurHandler}
              value={searchTerm}
            />
            {addedMoviesHasError && (
              <span className={styles.error_text}>
                You must add at least one movie to your watchlist.
              </span>
            )}
          </div>
        </div>

        {searchTerm && (
          <SearchResults
            searchTerm={searchTerm}
            handleResultClick={handleResultClick}
          />
        )}

        {addedMovies.length > 0 && (
          <>
            <p>Added Movies</p>
            <ul className={styles.addedmovies}>
              {addedMovies.map((movie) => (
                <li className={styles.li} key={movie.id}>
                  <SearchResult
                    key={movie.id}
                    movie={movie}
                    mode={mode}
                    removeMovie={removeMovie}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        <Button type="submit" disabled={!formIsValid} className={buttonClasses}>
          {mode === "edit" ? "Update Watchlist" : "Create Watchlist"}
        </Button>
      </form>
    </div>
  );
};
export default React.memo(WatchlistForm);
