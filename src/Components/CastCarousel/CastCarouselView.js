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
      left: container.scrollLeft + direction * scrollDistance,
      right: container.scrollRight + direction * scrollDistance,
      behavior: "smooth",
    });

    setShowLeftButton(container.scrollLeft > -10);
    setShowRightButton(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  };

  return (
    <div className={styles.cast_side_scroll}>
      {/* <hr className="solid"></hr> */}
      <div className={styles.carousel_container}>
        <div className={styles.carousel_nav}>
          <Button
            className={`${styles.carousel_nav_button} ${styles.left_nav_button}`}
            onClick={() => handleScroll(-1)}
            disabled={!showLeftButton}
          >
            <span className="material-icons">arrow_back_ios</span>
          </Button>

          <Button
            className={`${styles.carousel_nav_button} ${styles.right_nav_button}`}
            onClick={() => handleScroll(1)}
            disabled={!showRightButton}
          >
            <span className="material-icons">arrow_forward_ios</span>
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
