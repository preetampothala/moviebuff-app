import React, { useState } from "react";
import styles from "./MovieReviewText.module.css";
const MovieReviewText = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(review.content);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const contentStyle = isExpanded
    ? `${styles.content}`
    : `${styles.content} ${styles.truncated}`;

  let reviewDiv;
  if (review.content.length < 300) {
    reviewDiv = (
      <>
        <div className={styles.content}>
          <p>{review.content}</p>
        </div>
      </>
    );
  } else {
    reviewDiv = (
      <>
        <div className={contentStyle}>
          <p>{review.content}</p>
        </div>
        <button className={styles.button} onClick={toggleReadMore}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </>
    );
  }

  return <>{reviewDiv}</>;
};
export default MovieReviewText;
