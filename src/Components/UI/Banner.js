import React from "react";
import styles from "./Banner.module.css";

const Banner = (props) => {
  return (
    <section className={styles.banner}>
      <p>{props.children}</p>
    </section>
  );
};
export default Banner;
