import React from "react";
import { dayName, monthName } from "../Utils/utils";

const MyDay = () => {
  const date = new Date();
  const fullDate = `${dayName(date.getDay())}, ${date.getDate()} ${monthName(
    date.getMonth()
  )} ${date.getFullYear()}`;

  return (
    <>
      <h1>My Day</h1>
      <p>{fullDate}</p>
    </>
  );
};

export default MyDay;
