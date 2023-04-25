import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import WatchlistFrom from "../Components/WatchlistFrom/WatchlistForm";
import AuthContext from "../Store/auth-context";

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
      <WatchlistFrom mode={"edit"} watchlistData={watchlistData} />
    </>
  );
};

export default React.memo(EditWatchlist);
