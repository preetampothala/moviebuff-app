import React from "react";
import { Link } from "react-router-dom";
import styles from "./Streaming.module.css";
const Streaming = (props) => {
  const flatrate =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.flatrate;

  const free =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.free;

  const hasLink =
    props.watchProviders.results &&
    props.watchProviders.results.US &&
    props.watchProviders.results.US.link;

  const flatratelogos = flatrate
    ? props.watchProviders.results.US.flatrate.map((logo) => {
        return (
          <img
            className={styles.img}
            key={logo.logo_path}
            src={`https://image.tmdb.org/t/p/original${logo.logo_path}`}
            alt={logo.provider_name}
          />
        );
      })
    : null;
  const freelogos = free
    ? props.watchProviders.results.US.free.map((logo) => {
        console.log(logo);
        return (
          <img
            className={styles.img}
            key={logo.logo_path}
            src={`https://image.tmdb.org/t/p/original${logo.logo_path}`}
            alt={logo.provider_name}
          />
        );
      })
    : null;

  return (
    <>
      <h4 className={styles.sTitle}>STREAMING</h4>
      {hasLink && (
        <Link to={props.watchProviders.results.US.link} target="_blank">
          <section className={styles.streaminglogos}>
            {flatratelogos ? (
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
            ) : null}
          </section>
        </Link>
      )}
      <hr></hr>
    </>
  );
};
export default Streaming;
