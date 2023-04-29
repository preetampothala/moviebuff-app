import React from "react";
import { Fragment, useState, useEffect, useContext } from "react";
import Button from "../Components/UI/Button";
import Banner from "../Components/UI/Banner";
import styles from "./MyLists.module.css";
import MovieCarouselView from "../Components/MovieCarouselView/MovieCarouselView";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../Store/auth-context";
import WatchlistContext from "../Store/watchlist-context";
// import { fetchUserWatchlists } from "../Services/Watchlist.service";

const MyLists = () => {
  // const authCtx = useContext(AuthContext);
  const watchlistCtx = useContext(WatchlistContext);
  const [showWatchlists, setShowWatchlists] = useState(false);
  const [watchlists, setWatchlists] = useState({});
  // const userId = authCtx.userid;
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/createwatchlist");
  };

  // useEffect(() => {
  //   if (authCtx.userid) {
  //     setHasUserLoaded(false);
  //   } else {
  //     setHasUserLoaded(true);
  //   }
  // }, [authCtx.userid]);

  useEffect(() => {
    const watchlists = watchlistCtx.watchlists;
    if (watchlists) {
      setWatchlists(watchlists);
      setShowWatchlists(true);
    } else {
      setWatchlists({});
      setShowWatchlists(false);
    }
    // fetchUserWatchlists(userId).then((snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     const watchlists = {};
    //     for (const key in data) {
    //       const watchlist = {
    //         id: key,
    //         ...data[key],
    //       };
    //       watchlists[key] = watchlist;
    //     }
    //     setWatchlists(watchlists);
    //     setShowWatchlists(true);
    //   } else {
    //     setWatchlists({});
    //     setShowWatchlists(false);
    //   }
    // });

    // if (userId) {
    //   setWatchlists(watchlists);
    //   setShowWatchlists(true);
    // } else {
    //   setWatchlists({});
    //   setShowWatchlists(false);
    // }
  }, [watchlistCtx]);

  return (
    <Fragment>
      <div className={styles.watchlisttitle}>
        <h1>My Watchlists</h1>
        <Button className={styles.watchlistbutton} onClick={onClickHandler}>
          + New Watchlist
        </Button>
      </div>

      {!showWatchlists && (
        <Banner> You have no watchlists. Create one now!</Banner>
      )}

      {showWatchlists && (
        <>
          {Object.values(watchlists).map((watchlist, index) => (
            <MovieCarouselView
              key={index}
              watchlistId={watchlist.watchlistId}
              userId={watchlist.userId}
              watchlistName={watchlist.watchlistName}
              watchlistDescription={watchlist.watchlistDescription}
              movies={Object.values(watchlist.movies)}
              movieCount={Object.values(watchlist.movies).length}
              type={"watchlist"}
              parent="mylists"
              dateCreated={watchlist.dateCreated}
            />
          ))}
        </>
      )}
    </Fragment>
  );
};
export default MyLists;
