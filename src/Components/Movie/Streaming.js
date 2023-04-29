import React from "react";
import { Link } from "react-router-dom";
import styles from "./Streaming.module.css";
const Streaming = (props) => {
  const watchProviders = props.watchProviders.results.US;

  const flatrate = props.watchProviders.results?.US?.flatrate;
  const free = props.watchProviders.results?.US?.free;
  const rent = props.watchProviders.results?.US?.rent;
  const buy = props.watchProviders.results?.US?.buy;
  const hasLink = props.watchProviders.results?.US?.link;
  const ads = props.watchProviders.results?.US?.ads;

  const rentJSX = [];
  const buyJSX = [];
  const freeJSX = [];
  const flatrateJSX = [];
  const adsJSX = [];
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
    }
    if (key === "ads" && ads) {
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
      adsJSX.push(...jsx);
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
            {adsJSX.length > 0 && (
              <div className={styles.streamingSection}>
                <p className={styles.streamingtype}>Ads</p>
                {adsJSX}
              </div>
            )}
          </section>
        </Link>
      )}
      <hr></hr>
    </>
  );
};
export default Streaming;
