import React from "react";
import { useState, useEffect, useContext } from "react";
import { fetchAllWatchlists } from "../Services/Watchlist.service";
import MovieCarouselView from "../Components/MovieCarouselView/MovieCarouselView";
import AuthContext from "../Store/auth-context";

const Plists = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userid;
  const [watchlists, setWatchlists] = useState([]);
  useEffect(() => {
    fetchAllWatchlists().then((snapshot) => {
      const data = snapshot.val();
      const allWatchlists = [];
      for (const userid in data) {
        const userWatchlists = data[userid].watchlists;
        for (const watchlistId in userWatchlists) {
          allWatchlists.push(userWatchlists[watchlistId]);
        }
      }
      const wlfromOtherUsers = allWatchlists.filter((watchlist) => {
        return watchlist.userId !== userId;
      });
      const filteredWatchlists = wlfromOtherUsers.filter((watchlist) => {
        return watchlist.imported !== true;
      });
      setWatchlists(filteredWatchlists);
    });
  }, [userId]);

  return (
    <>
      <h1>Public Watchlists</h1>
      {watchlists.length > 0 &&
        watchlists.map((watchlist, index) => (
          <MovieCarouselView
            key={index}
            watchlistId={watchlist.watchlistId}
            userId={watchlist.userId}
            watchlistName={watchlist.watchlistName}
            watchlistDescription={watchlist.watchlistDescription}
            movies={Object.values(watchlist.movies)}
            movieCount={Object.values(watchlist.movies).length}
            parent="plists"
            dateCreated={watchlist.dateCreated}
            createdBy={watchlist.createdBy}
          />
        ))}
    </>
  );
};
export default Plists;
