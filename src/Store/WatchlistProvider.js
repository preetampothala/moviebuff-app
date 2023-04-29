import WatchlistContext from "./watchlist-context";
import { useReducer, useCallback, useEffect, useContext } from "react";
import AuthContext from "./auth-context";
import {
  fetchUserWatchlists,
  createWatchlist,
  updateWatchlist,
  addToMyDay,
  addToPlanned,
  markMovieAsWatched,
  importWatchlist,
  addMovieToWatchlist,
} from "../Services/Watchlist.service";
const defaultWatchlistsState = {};
const watchlistReducer = (state, action) => {
  if (action.type === "FETCH") {
    return action.watchlists;
  }

  //  else if (action.type === "ADD") {
  //   // return {
  //   //   ...state,
  //   //   [action.watchlistId]: action.watchlist,
  //   // };
  //   return state;
  // } else if (action.type === "UPDATE") {
  //   return {
  //     ...state,
  //     [action.watchlistId]: action.watchlist,
  //   };
  // } else if (action.type === "IMPORT") {
  //   return {
  //     ...state,
  //     [action.watchlistId]: action.watchlist,
  //   };
  // } else if (action.type === "ADD_MOVIE") {
  //   const movieExists = state[action.watchlistId].movies?.[action.movie.id];

  //   // If the movie already exists, return the current state without updating it
  //   if (movieExists) {
  //     return state;
  //   }
  //   const updatedWatchlist = {
  //     ...state[action.watchlistId],
  //     movies: {
  //       ...state[action.watchlistId].movies,
  //       [action.movie.id]: action.movie,
  //     },
  //   };
  //   return {
  //     ...state,
  //     [action.watchlistId]: updatedWatchlist,
  //   };
  // }
  // // else if (action.type === "MARK_MOVIE_AS_WATCHED") {
  // //   // mark the movie as watched in the watchlists->watchlist->movies->movieId->watched: true
  // //   const updatedWatchlist = {
  // //     ...state[action.watchlistId],
  // //     movies: {
  // //       ...state[action.watchlistId].movies,
  // //       [action.movieId]: {
  // //         ...state[action.watchlistId].movies[action.movieId],
  // //         watched: true,
  // //       },
  // //     },
  // //   };
  // //   return {
  // //     ...state,
  // //     [action.watchlistId]: updatedWatchlist,
  // //   };
  // // }
  // else if (action.type === "MARK_MOVIE_AS_WATCHED") {
  //   // Check if the watchlist and movies exist before accessing their properties
  //   // const currentWatchlist = state[action.watchlistId];
  //   // const currentMovies = currentWatchlist && currentWatchlist.movies;
  //   // // If the watchlist or movies don't exist, return the current state without updating it
  //   // if (!currentWatchlist || !currentMovies) {
  //   //   return state;
  //   // }
  //   // // mark the movie as watched in the watchlists->watchlist->movies->movieId->watched: true
  //   // const updatedWatchlist = {
  //   //   ...currentWatchlist,
  //   //   movies: {
  //   //     ...currentMovies,
  //   //     [action.movieId]: {
  //   //       ...currentMovies[action.movieId],
  //   //       watched: true,
  //   //     },
  //   //   },
  //   // };
  //   // return {
  //   //   ...state,
  //   //   [action.watchlistId]: updatedWatchlist,
  //   // };
  // } else if (action.type === "ADD_TO_MYDAY") {
  //   const updatedWatchlist = {
  //     ...state[action.watchlistId],
  //     movies: {
  //       ...state[action.watchlistId].movies,
  //       [action.movieId]: {
  //         ...state[action.watchlistId].movies[action.movieId],
  //         myday: true,
  //       },
  //     },
  //   };
  //   return {
  //     ...state,
  //     [action.watchlistId]: updatedWatchlist,
  //   };
  // }
  return defaultWatchlistsState;
};
const WatchlistProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userid;
  // const [loading, setLoading] = useState(true);
  const [watchlists, dispatchWatchlistAction] = useReducer(
    watchlistReducer,
    defaultWatchlistsState
  );
  // const fetchWatchlists = useCallback(() => {
  //   fetchUserWatchlists(userId).then((snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const watchlists = {};
  //       for (const key in data) {
  //         const watchlist = {
  //           id: key,
  //           ...data[key],
  //         };
  //         watchlists[key] = watchlist;
  //       }
  //       dispatchWatchlistAction({ type: "FETCH", watchlists });
  //     }
  //   });
  // }, [userId]);
  const fetchWatchlists = useCallback((userId) => {
    const handleDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const watchlists = {};
        for (const key in data) {
          const watchlist = {
            id: key,
            ...data[key],
          };
          watchlists[key] = watchlist;
        }

        dispatchWatchlistAction({ type: "FETCH", watchlists });
      }
    };
    const detachListener = fetchUserWatchlists(userId, handleDataChange);
    return detachListener;
  }, []);
  useEffect(() => {
    const detachListener = fetchWatchlists(userId);
    // setLoading(false);
    return () => {
      detachListener();
    };
  }, [fetchWatchlists, userId]);

  // useEffect(() => {
  //   fetchUserWatchlists(userId).then((snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const watchlists = {};
  //       for (const key in data) {
  //         const watchlist = {
  //           id: key,
  //           ...data[key],
  //         };
  //         watchlists[key] = watchlist;
  //       }
  //       fetchWatchlists(watchlists);
  //     }
  //     setLoading(false);
  //   });
  // }, [userId, fetchWatchlists]);
  // useEffect(() => {
  //   fetchWatchlists();
  //   setLoading(false);
  // }, [fetchWatchlists]);
  const addNewWatchlist = async (watchlist, watchlistId) => {
    // Call the function to create a new watchlist in the Firebase database
    await createWatchlist(watchlist, watchlistId, userId);
    // Update the context with the newly added watchlist
    // dispatchWatchlistAction({
    //   type: "ADD",
    //   // watchlist: watchlist,
    //   // watchlistId: watchlistId,
    // });
  };
  const updatecurrentWatchlist = async (watchlist, watchlistId) => {
    // Call the function to create a new watchlist in the Firebase database
    await updateWatchlist(watchlist, watchlistId, userId);
    // Update the context with the newly added watchlist
    // dispatchWatchlistAction({
    //   type: "UPDATE",
    //   watchlist: watchlist,
    //   watchlistId: watchlistId,
    // });
  };
  const importWatList = async (watchlist, watchlistId) => {
    // Call the function to create a new watchlist in the Firebase database
    await importWatchlist(watchlist, watchlistId, userId);
    // Update the context with the newly added watchlist
    // dispatchWatchlistAction({
    //   type: "IMPORT",
    //   watchlist: watchlist,
    //   watchlistId: watchlistId,
    // });
  };
  const addMovieToExistingWatchlist = async (movie, watchlistId) => {
    await addMovieToWatchlist(movie, watchlistId, userId);

    // dispatchWatchlistAction({
    //   type: "ADD_MOVIE",
    //   movie: movie,
    //   watchlistId: watchlistId,
    // });
  };
  const markMovAsWatched = async (movieId, watchlistId) => {
    await markMovieAsWatched(movieId, watchlistId, userId);
    // dispatchWatchlistAction({
    //   type: "MARK_MOVIE_AS_WATCHED",
    //   movieId: movieId,
    //   watchlistId: watchlistId,
    // });
  };
  const addToDay = async (movieId, watchlistId) => {
    await addToMyDay(movieId, watchlistId, userId);
    // dispatchWatchlistAction({
    //   type: "ADD_TO_MY_DAY",
    //   movieId: movieId,
    //   watchlistId: watchlistId,
    // });
  };

  const addPlanned = async (movieId, watchlistId, date) => {
    await addToPlanned(movieId, watchlistId, userId, date);
    // dispatchWatchlistAction({
    //   type: "ADD_TO_PLANNED",
    //   movieId: movieId,
    //   watchlistId: watchlistId,
    // });
  };

  const watchlistContext = {
    watchlists,
    addNewWatchlist,
    updatecurrentWatchlist,
    addMovieToExistingWatchlist,
    markMovAsWatched,
    fetchWatchlists,
    addToDay,
    addPlanned,
    importWatList,
    // loading,
  };
  return (
    <WatchlistContext.Provider value={watchlistContext}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
export default WatchlistProvider;
