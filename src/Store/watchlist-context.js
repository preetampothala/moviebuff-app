//watchlist context
import React from "react";
const WatchlistContext = React.createContext({
  watchlists: {
    watchlistid: {
      userId: "",
      watchlistid: "",
      watchlistname: "",
      watchlistdescription: "",
      addedMovies: {},
    },
  },
  createWatchlist: (watchlist) => {},
  deleteWatchlist: (watchlistId) => {},
  editWatchlist: (watchlistId, watchlist) => {},
  addMovieToWatchlist: (movie) => {},
  removeMovieFromWatchlist: (movieId) => {},
  fetchWatchlists: () => {},
  isMovieInWatchlist: (movieId) => {},
  watchlistCount: 0,
});
export default WatchlistContext;
