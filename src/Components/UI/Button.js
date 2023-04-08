import React from "react";
import styles from "./Button.module.css";
const Button = (props) => {
  const styling = styles.button + " " + props.className;
  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <button
      className={styling}
      onClick={onClickHandler}
      disabled={props.disabled}
      type={props.button}
      name={props.name}
    >
      {props.children}
    </button>
  );
};
export default Button;
