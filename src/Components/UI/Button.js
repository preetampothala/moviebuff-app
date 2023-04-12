import React from "react";
import styles from "./Button.module.css";
const Button = (props) => {
  const styling = styles.button + " " + props.className;

  return (
    <button
      className={styling}
      value={props.value}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      name={props.name}
    >
      {props.children}
    </button>
  );
};
export default Button;
