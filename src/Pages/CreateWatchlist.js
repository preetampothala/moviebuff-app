import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WatchlistFrom from "../Components/WatchlistFrom/watchlistForm";
import { watchlist } from "../Utils/utils";
const CreateWatchlist = () => {
  const params = useParams();
  const watchlistid = params.watchlistId;
  const [mode, setMode] = useState("create");
  const [watchlistData, setWatchlistData] = useState(null);
  useEffect(() => {
    if (watchlistid) {
      setMode("edit");
      setWatchlistData(watchlist);
    }
  }, [watchlistid]);

  return (
    <>
      <WatchlistFrom mode={mode} watchlistData={watchlistData} />
    </>
  );
};

export default CreateWatchlist;
