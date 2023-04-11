import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import SearchResults from "../../Pages/SearchResults";
import SearchResult from "../SearchResult/SearchResult";
import AuthContext from "../../Store/auth-context";
import useValidate from "../../hooks/use-validation";
import useInput from "../../hooks/use-input";
import styles from "./watchlistFrom.module.css";
const WatchlistFrom = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const watchlistDescriptionInputRef = useRef();
  const watchlistNameInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const { mode, watchlistData } = props;

  const {
    value: watchlistname,
    isValid: watchlistnameIsValid,
    hasError: watchlistnameHasError,
    valueChangeHandler: watchlistnameChangeHandler,
    inputBlurHandler: watchlistnameBlurHandler,
    reset: resetWatchlistname,
  } = useInput((value) => typeof value === "string" && value.trim() !== "");
  const {
    value: watchlistdescription,
    isValid: watchlistdescriptionIsValid,
    hasError: watchlistdescriptionHasError,
    valueChangeHandler: watchlistdescriptionChangeHandler,
    inputBlurHandler: watchlistdescriptionBlurHandler,
    reset: resetWatchlistdescription,
  } = useInput((value) => typeof value === "string" && value.trim() !== "");

  const {
    movies: addedMovies,
    addedMoviesIsValid,
    addedMoviesHasError,
    addMovieHandler: setAddedMovies,
    resetAddedMovies,
    inputBlurHandler: movieSearchBlurHandler,
  } = useValidate((addedMovies) => addedMovies.length > 0);

  useEffect(() => {
    if (mode === "edit") {
      resetWatchlistname(watchlistData.watchlistname);
      resetWatchlistdescription(watchlistData.watchlistdescription);
      resetAddedMovies(watchlistData.addedMovies);
    }
  }, [
    mode,
    watchlistData,
    resetWatchlistname,
    resetWatchlistdescription,
    resetAddedMovies,
  ]);
  let formIsValid = false;
  if (
    watchlistnameIsValid &&
    watchlistdescriptionIsValid &&
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const watchlistname = watchlistNameInputRef.current.value;
    const watchlistdescription = watchlistDescriptionInputRef.current.value;
    const movies = addedMovies;
    //use first 3 letters of watchlistname and a random number to create a unique id
    const watchlistid =
      watchlistname.slice(0, 3) + Math.floor(Math.random() * 1000);

    const watchlist = {
      [watchlistid]: {
        userId: authCtx.userid,
        watchlistid: watchlistid,
        watchlistname: watchlistname,
        watchlistdescription: watchlistdescription,
        movies: movies,
      },
      [watchlistid]: {
        userId: authCtx.userid,
        watchlistid: watchlistid,
        watchlistname: watchlistname,
        watchlistdescription: watchlistdescription,
        movies: movies,
      },
    };

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    fetch(
      "https://moviebuff-38aaa-default-rtdb.firebaseio.com/watchlists.json",
      {
        method: "POST",
        body: JSON.stringify(watchlist),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
          <label htmlFor="watchlistname" className={styles.label}>
            Watchlist Name
          </label>
          <input
            type="text"
            id="watchlistname"
            name="watchlistname"
            onChange={watchlistnameChangeHandler}
            className={styles.input}
            ref={watchlistNameInputRef}
            onBlur={watchlistnameBlurHandler}
            value={watchlistname}
          />
          {watchlistnameHasError && (
            <span className={styles.error_text}>
              Watchlist name is required.
            </span>
          )}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="watchlistdescription" className={styles.label}>
            Watchlist Description
          </label>
          <input
            type="text"
            id="watchlistdescription"
            name="watchlistdescription"
            onChange={watchlistdescriptionChangeHandler}
            className={styles.input}
            onBlur={watchlistdescriptionBlurHandler}
            ref={watchlistDescriptionInputRef}
            value={watchlistdescription}
          />
          {watchlistdescriptionHasError && (
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
                <li className={styles.li}>
                  <SearchResult key={movie.id} movie={movie} />
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
export default WatchlistFrom;
