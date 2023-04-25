import React from "react";
import WatchlistForm from "../Components/WatchlistForm/WatchlistForm";

const CreateWatchlist = () => {
  return (
    <>
      <WatchlistForm mode={"create"} />
    </>
  );
};

export default React.memo(CreateWatchlist);
