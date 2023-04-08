// maintain the global watchlists state of the application

import WatchlistContext from "./watchlist-context";
import { useReducer } from "react";
const defaultWatchlistsState = [{}];
const watchlistReducer = (state, action) => {};

const WatchlistProvider = (props) => {
  const [watchlists, dispatchWatchlists] = useReducer(
    watchlistReducer,
    defaultWatchlistsState
  );
  const watchlistContext = {
    watchlists: watchlists,
  };
  return (
    <WatchlistContext.Provider value={watchlistContext}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
export default WatchlistProvider;
