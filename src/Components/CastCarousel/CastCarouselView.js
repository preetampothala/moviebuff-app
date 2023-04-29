import { React, useRef, useState } from "react";
import CastPoster from "../CastPoster/CastPoster";
import styles from "./CastCarouselView.module.css";
import Button from "../UI/Button";

function CastCarouselView(props) {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const imgStyling = props.className ? props.className : styles.posterimg;

  const handleScroll = (direction) => {
    const container = scrollRef.current;

    const scrollDistance = container.offsetWidth;
    container.scrollTo({
      left: container.scrollLeft + (direction * scrollDistance) / 2,
      // right: container.scrollRight + (direction * scrollDistance) / 2,
      behavior: "smooth",
    });

    setTimeout(() => {
      setShowLeftButton(container.scrollLeft > 0.5);
      setShowRightButton(
        container.scrollLeft + container.offsetWidth < container.scrollWidth
      );
    }, 300);
  };
  const leftButtonStyles = showLeftButton
    ? `${styles.carousel_nav_button}`
    : `${styles.carousel_nav_button} ${styles.disabled}`;
  const rightButtonStyles = showRightButton
    ? `${styles.carousel_nav_button}`
    : `${styles.carousel_nav_button} ${styles.disabled}`;

  return (
    <div className={styles.cast_side_scroll}>
      <div className={styles.carousel_container}>
        <div className={styles.carousel_nav}>
          <Button
            className={leftButtonStyles}
            onClick={() => handleScroll(-1)}
            disabled={!showLeftButton}
          >
            <span className="material-icons">chevron_left</span>
          </Button>

          <Button
            className={rightButtonStyles}
            onClick={() => handleScroll(1)}
            disabled={!showRightButton}
          >
            <span className="material-icons">chevron_right</span>
          </Button>
        </div>
        <div className={styles.cast_posters} ref={scrollRef}>
          {props.cast.map((cast) => (
            <div key={cast.id} className={styles.posterimg}>
              <CastPoster cast={cast} className={imgStyling} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CastCarouselView;
