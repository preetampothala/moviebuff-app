import React from "react";

const Scroll = (props) => {
  return (
    <div style={{ overflowY: "scroll", height: "10vh" }}>{props.children}</div>
  );
};

export default Scroll;
