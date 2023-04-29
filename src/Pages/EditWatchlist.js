import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WatchlistForm from "../Components/WatchlistForm/WatchlistForm";

const EditWatchlist = () => {
  const location = useLocation();
  const { watchlist } = location.state || {};

  const [watchlistData, setWatchlistData] = useState({});
  useEffect(() => {
    setWatchlistData(watchlist);
  }, [watchlist]);
  return (
    <>
      <WatchlistForm mode={"edit"} watchlistData={watchlistData} />
    </>
  );
};

export default React.memo(EditWatchlist);
