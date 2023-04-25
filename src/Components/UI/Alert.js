import React, { useEffect, useState } from "react";
import styles from "./Alert.module.css";

const Alert = ({ show, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const onclickHandler = () => {
    setIsVisible(false);
    onClose();
  };

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);
    }
  }, [show, onClose]);

  return (
    <div
      className={
        styles.alert + " " + { isVisible }
          ? styles.alertvisible
          : styles.alerthidden
      }
    >
      <p>{children}</p>
      <button className={styles.button} onClick={onclickHandler}>
        <span className="material-icons">close</span>
      </button>
    </div>
  );
};

export default Alert;
