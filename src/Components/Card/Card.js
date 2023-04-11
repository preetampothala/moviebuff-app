import styles from "./Card.module.css";
const Card = (props) => {
  const classes = styles.card;
  return <>{props.children}</>;
};
export default Card;
