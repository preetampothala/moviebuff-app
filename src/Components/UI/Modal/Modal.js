import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";
import Button from "../Button";
import ReactDOM from "react-dom";
import WatchlistContext from "../../../Store/watchlist-context";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
  const watchlistCtx = useContext(WatchlistContext);
  const [text, setText] = useState("");
  const [mode, setMode] = useState("create");
  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    event.preventDefault();

    event.preventDefault();
    if (event.target.value === "Create New Watchlist") {
      setText("");
      setMode("create");
    } else {
      const watchlists = watchlistCtx.watchlists;
      const watchlistName = watchlists[event.target.value].watchlistName;

      console.log(watchlistName);
      setText(watchlistName);
      setMode("existing");
    }
  };
  const createWatclistHandler = () => {
    navigate("/createwatchlist");
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (mode === "create") {
      createWatclistHandler();
    } else {
      watchlistCtx.addMovieToExistingWatchlist(props.modalMovie, text);
      setTimeout(() => {
        props.onClose();
      }, 2000);
    }
  };
  return (
    <div className={styles.modal}>
      <header className={styles.modalheader}>
        <h3>Add Movie to Watchlist</h3>
        <button className={styles.button} onClick={props.onClose}>
          <span className="material-icons">close</span>
        </button>
      </header>
      <section className={styles.existing}>
        <form onSubmit={submitHandler}>
          <label className={styles.label} htmlFor="title">
            Select
          </label>
          <div className={styles.divselect}>
            <select
              className={styles.select}
              onChange={handleSelectChange}
              name="watchlist"
              id="watchlist"
            >
              {/* {props.watchListNames.map((watchlistName) => {
                return (
                  <option key={watchlistName} value={watchlistName}>
                    {watchlistName}
                  </option>
                );
              })} */}
              <option selected={true}>Create New Watchlist</option>
              {props.watchlistdetail.map((watchlist) => {
                return (
                  <option
                    key={watchlist.watchlistId}
                    value={watchlist.watchlistId}
                    name={watchlist.watchlistName}
                  >
                    {watchlist.watchlistName}
                  </option>
                );
              })}
            </select>
          </div>
          {text && (
            <p className={styles.p}>
              {`You are adding this movie to "${text}" watchlist`}
            </p>
          )}

          {/* {mode === "create" ? (
            <section className={styles.new}>
              <p className={styles.newp}> or Create New Watchlist</p>
              <Button
                className={styles.watchlistbutton}
                onClick={createWatclistHandler}
              >
                {mode === "existing" ? "Add to watchlist" : "+ New Watchlist"}
              </Button>
            </section>
          ) : ( */}
          <section className={styles.new}>
            <Button className={styles.watchlistbutton}>
              {mode === "existing" ? "Add to watchlist" : "+ New Watchlist"}
            </Button>
          </section>
          {/* )} */}
        </form>
      </section>
    </div>
  );
};

const Modal = (props) => {
  const watchlistCtx = useContext(WatchlistContext);
  const [watchlistNames, setWatchlistNames] = useState([]);
  const [watchlistdetail, setWatchlistdetail] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);

  useEffect(() => {
    // fetch current user watchlist names to use in select dropdown
    const watchlists = watchlistCtx.watchlists;
    const watchlistNames = [];
    for (const id in watchlists) {
      const watchlistName = watchlists[id].watchlistName;
      watchlistNames.push(watchlistName);
    }
    const watchlistIds = [];
    for (const id in watchlists) {
      const watchlistId = id;
      watchlistIds.push(watchlistId);
    }
    const watchlistdetail = [];
    for (const id in watchlists) {
      const watchlistId = id;
      const watchlistName = watchlists[id].watchlistName;
      watchlistdetail.push({ watchlistId, watchlistName });
    }
    setWatchlistIds(watchlistIds);
    setWatchlistdetail(watchlistdetail);
    setWatchlistNames(watchlistNames);
  }, [watchlistCtx]);
  // useEffect(() => {

  //   fetchUserWatchlists(userId).then((snapshot) => {
  //     const data = snapshot.val();

  //     if (data) {
  //       const watchlistIds = [];
  //       for (const id in data) {
  //         const watchlistId = id;
  //         watchlistIds.push(watchlistId);
  //       }
  //       const watchlistNames = [];
  //       for (const id in data) {
  //         const watchlistName = data[id].watchlistName;
  //         watchlistNames.push(watchlistName);
  //       }
  //       const watchlistdetail = [];
  //       for (const id in data) {
  //         const watchlistId = id;
  //         const watchlistName = data[id].watchlistName;
  //         watchlistdetail.push({ watchlistId, watchlistName });
  //       }
  //       setWatchlistIds(watchlistIds);
  //       setWatchlistNames(watchlistNames);
  //       setWatchlistdetail(watchlistdetail);
  //     } else {
  //       setWatchlistNames([]);
  //     }
  //   });
  // }, [userId, watchlistCtx]);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          modalMovie={props.modalMovie}
          watchListNames={watchlistNames}
          watchlistIds={watchlistIds}
          watchlistdetail={watchlistdetail}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default React.memo(Modal);
