import { useRef } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const inputRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSearch(inputRef.current.value);
  };
  return (
    <>
      <form type="submit" className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          ref={inputRef}
          placeholder="Search movies..."
          value={""}
        />
      </form>
    </>
  );
};

export default SearchBar;
