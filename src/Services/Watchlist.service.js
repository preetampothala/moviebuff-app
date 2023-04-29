import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDterKQwdXqaIVJREc4Cfo3_HHV6yezkk",
  authDomain: "moviebuff-38aaa.firebaseapp.com",
  databaseURL: "https://moviebuff-38aaa-default-rtdb.firebaseio.com",
  projectId: "moviebuff-38aaa",
  storageBucket: "moviebuff-38aaa.appspot.com",
  messagingSenderId: "763469325400",
  appId: "1:763469325400:web:daf663b4588f89204e562d",
  measurementId: "G-H8YLVEKCM4",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// export const fetchUserWatchlists = async (userId) => {
//   const watchlistRef = ref(db, `users/${userId}/watchlists`);
//   return get(watchlistRef);
// };
export const fetchUserWatchlists = (userId, onDataChange) => {
  const db = getDatabase();
  const watchlistRef = ref(db, `users/${userId}/watchlists`);
  const unsubscribe = onValue(watchlistRef, onDataChange);
  return unsubscribe;
};
export const fetchAllWatchlists = async () => {
  const db = getDatabase();
  const watchlistsRef = ref(db, "users");
  return get(watchlistsRef);
};
export const fetchWatchlist = async (watchlistId, userId) => {
  const watchlistRef = ref(db, `users/${userId}/watchlists/${watchlistId}`);
  return get(watchlistRef);
};
export const createWatchlist = async (watchlist, watchlistId, userId) => {
  const watchlistRef = ref(db, `users/${userId}/watchlists/${watchlistId}`);
  return set(watchlistRef, watchlist);
};
export const updateWatchlist = async (watchlist, watchlistId, userId) => {
  const watchlistRef = ref(db, `users/${userId}/watchlists/${watchlistId}`);
  return update(watchlistRef, watchlist);
};

export const importWatchlist = async (watchlist, watchlistId, userId) => {
  const watchlistRef = ref(db, `users/${userId}/watchlists/${watchlistId}`);

  const movies = Object.entries(watchlist.movies).reduce(
    (acc, [key, movie]) => {
      // add watchlistId to each movie
      acc[key] = movie;
      movie.watched = false;
      return acc;
    },
    {}
  );

  watchlist.movies = movies;

  const newWatchlist = {
    ...watchlist,
    imported: true,
  };
  set(watchlistRef, newWatchlist);

  // return update(watchlistRef, { imported: true });
};

export const deleteWatchlist = async (watchlistId, userId) => {
  const watchlistRef = ref(db, `users/${userId}/watchlists/${watchlistId}`);
  return update(watchlistRef, null);
};

export const addMovieToWatchlist = async (movie, watchlistId, userId) => {
  const movieRef = ref(
    db,
    `users/${userId}/watchlists/${watchlistId}/movies/${movie.id}`
  );
  return set(movieRef, movie);
};

export const addToMyDay = async (movieId, watchlistId, userId) => {
  const myDayRef = ref(
    db,
    `users/${userId}/watchlists/${watchlistId}/movies/${movieId}/`
  );
  return update(myDayRef, { myDay: true });
};
export const addToPlanned = async (
  movieId,
  watchlistId,
  userId,
  plannedDate
) => {
  const myDayRef = ref(
    db,
    `users/${userId}/watchlists/${watchlistId}/movies/${movieId}/`
  );
  update(myDayRef, { watchlistId: watchlistId });
  return update(myDayRef, { plannedDate: plannedDate });
};

export const markMovieAsWatched = async (movieId, watchlistId, userId) => {
  const watchedRef = ref(
    db,
    `users/${userId}/watchlists/${watchlistId}/movies/${movieId}/`
  );
  return update(watchedRef, { watched: true });
};
