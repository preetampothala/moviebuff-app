import React from "react";
import WatchlistFrom from "../Components/WatchlistFrom/WatchlistForm";

const CreateWatchlist = () => {
  return (
    <>
      <WatchlistFrom mode={"create"} />
    </>
  );
};

export default React.memo(CreateWatchlist);
