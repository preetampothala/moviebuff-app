import React from "react";
import { Link } from "react-router-dom";
import styles from "./Streaming.module.css";
const Streaming = (props) => {
  const watchProviders = props.watchProviders.results.US;

  // console.log(watchProviders);
  const flatrate =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.flatrate;
  const free =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.free;
  const rent =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.rent;
  const buy =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.buy;

  const hasLink =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.link;
  // console.log(flatrate, free, rent, buy, hasLink);

  const rentJSX = [];
  const buyJSX = [];
  const freeJSX = [];
  const flatrateJSX = [];
  for (const key in watchProviders) {
    if (key === "rent" && rent) {
      const rentjs = [...watchProviders[key]].map((logo) => {
        return (
          <img
            className={styles.img}
            key={logo.logo_path}
            src={`https://image.tmdb.org/t/p/original${logo.logo_path}`}
            alt={logo.provider_name}
          />
        );
      });
      rentJSX.push(...rentjs);
      // console.log("rentJSX", rentJSX);
    }
    if (key === "buy" && buy) {
      const jsx = [...watchProviders[key]].map((logo) => {
        return (
          <img
            className={styles.img}
            key={logo.logo_path}
            src={`https://image.tmdb.org/t/p/original${logo.logo_path}`}
            alt={logo.provider_name}
          />
        );
      });
      buyJSX.push(...jsx);
      // console.log("buyJSX", buyJSX);
    }
    if (key === "flatrate" && flatrate) {
      const jsx = [...watchProviders[key]].map((logo) => {
        return (
          <img
            className={styles.img}
            key={logo.logo_path}
            src={`https://image.tmdb.org/t/p/original${logo.logo_path}`}
            alt={logo.provider_name}
          />
        );
      });
      flatrateJSX.push(...jsx);
      // console.log("flatrateJSX", flatrateJSX);
    }
    if (key === "free" && free) {
      const jsx = [...watchProviders[key]].map((logo) => {
        return (
          <img
            className={styles.img}
            key={logo.logo_path}
            src={`https://image.tmdb.org/t/p/original${logo.logo_path}`}
            alt={logo.provider_name}
          />
        );
      });
      freeJSX.push(...jsx);
      // console.log("freeJSX", freeJSX);
    }
  }

  return (
    <>
      <h4 className={styles.sTitle}>STREAMING</h4>
      {hasLink && (
        <Link to={props.watchProviders.results.US.link} target="_blank">
          <section className={styles.streaminglogos}>
            {freeJSX.length > 0 && (
              <div className={styles.streamingSection}>
                <p className={styles.streamingtype}>Streaming Subscription</p>
                {freeJSX}
              </div>
            )}
            {flatrateJSX.length > 0 && (
              <div className={styles.streamingSection}>
                <p className={styles.streamingtype}>Streaming Subscription</p>
                {flatrateJSX}
              </div>
            )}
            {rentJSX.length > 0 && (
              <div className={styles.streamingSection}>
                <p className={styles.streamingtype}>Rent</p>
                {rentJSX}
              </div>
            )}
            {buyJSX.length > 0 && (
              <div className={styles.streamingSection}>
                <p className={styles.streamingtype}>Buy</p>
                {buyJSX}
              </div>
            )}

            {/* {flatratelogos ? (
              <div>
                <p className={styles.streamingtype}>Streaming Subscription</p>
                {flatratelogos}
              </div>
            ) : null}

            {freelogos ? (
              <div>
                <p className={styles.streamingtype}>Free</p>
                {freelogos}
              </div>
            ) : null} */}
          </section>
        </Link>
      )}
      <hr></hr>
    </>
  );
};
export default Streaming;
