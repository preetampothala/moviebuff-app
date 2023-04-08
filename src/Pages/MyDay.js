import React from "react";
import { dayName, monthName } from "../Utils/utils";

const MyDay = () => {
  const date = new Date();
  const fullDate = `${dayName(date.getDay())}, ${date.getDate()} ${monthName(
    date.getMonth()
  )} ${date.getFullYear()}`;

  return (
    <>
      <div>
        <h2>My Day</h2>
        <p>{fullDate}</p>
      </div>
    </>
  );
};

export default MyDay;
