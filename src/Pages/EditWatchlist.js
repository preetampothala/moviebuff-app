import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WatchlistForm from "../Components/WatchlistForm/WatchlistForm";

const EditWatchlist = () => {
  console.log("in edit watchlist");
  //   const authCtx = useContext(AuthContext);
  //   const params = useParams();
  //   const watchlistId = params.watchlistId;
  const location = useLocation();
  const { watchlist } = location.state || {};
  console.log("watchlist", watchlist);
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
