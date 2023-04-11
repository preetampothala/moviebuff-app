import { useState, useCallback } from "react";
const useValidate = (validateValue) => {
  const [isTouched, setIsTouched] = useState(false);
  const [addedMovies, setAddedMovies] = useState([]);

  const addedMoviesIsValid = validateValue(addedMovies);

  const addedMoviesHasError = addedMovies.length === 0 && isTouched;

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };
  const addMovieHandler = (movie) => {
    setAddedMovies((prevMovies) => prevMovies.concat(movie));
  };

  const resetAddedMovies = useCallback((fromwatchlist) => {
    if (fromwatchlist) {
      console.log("fromwatchlist");
      setAddedMovies(fromwatchlist);
    } else {
      setAddedMovies([]);
    }
  }, []);

  return {
    movies: addedMovies,
    addedMoviesIsValid,
    addedMoviesHasError,
    inputBlurHandler,
    addMovieHandler,
    resetAddedMovies,
  };
};
export default useValidate;
