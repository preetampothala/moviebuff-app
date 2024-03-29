import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SearchResults.module.css";
import SearchResult from "../Components/SearchResult/SearchResult";
const SearchResults = (props) => {
  const params = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleResultClick = (movieId, movie) => {
    if (props.handleResultClick) {
      props.handleResultClick(movie);
    } else {
      navigate(`/movies/${movieId}`);
    }
  };

  const searchTerm = params.searchquery || props.searchTerm || "";

  useEffect(() => {
    const handleSearchSubmit = async (searchTerm) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=e418fdbca3c905f8b53cababd0a32c2f&query=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("Error fetching search results. Please try again.");
        }
        const data = await response.json();
        setSearchResults(data.results);
        setError(null);
      } catch (error) {
        setSearchResults([]);
        setError(error.message);
      }
    };
    handleSearchSubmit(searchTerm);
  }, [searchTerm]);

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <Fragment>
      <h3 className={styles.title}>Search Results</h3>
      {searchResults.length === 0 && (
        <p className={styles.noresults}>No results found.</p>
      )}
      <div className={styles.ul}>
        {searchResults.map((movie) => (
          <div
            className={styles.li}
            key={movie.id}
            onClick={() => handleResultClick(movie.id, movie)}
          >
            <SearchResult movie={movie}></SearchResult>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
export default SearchResults;
