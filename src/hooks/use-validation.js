import { useState, useCallback } from "react";
const useValidate = (validateValue) => {
  const [isTouched, setIsTouched] = useState(false);
  const [addedMovies, setAddedMovies] = useState([]);
  const addedMoviesIsValid = validateValue(addedMovies);
  const addedMoviesHasError = addedMovies.length === 0 && isTouched;
  const inputBlurHandler = useCallback((event) => {
    setIsTouched(true);
  }, []);
  const addMovieHandler = useCallback(
    (movie) => {
      //if the movie already exists in the addedmovies, don't add it again
      if (addedMovies.indexOf(movie) === -1) {
        setAddedMovies((prevMovies) => prevMovies.concat(movie));
      } else {
        console.log("movie already added");
      }
    },
    [addedMovies]
  );
  const removeMovieHandler = useCallback((movieId) => {
    setAddedMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  }, []);

  const resetAddedMovies = useCallback((fromwatchlist) => {
    if (fromwatchlist) {
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
    removeMovieHandler,
    resetAddedMovies,
  };
};
export default useValidate;
