import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
const MovieSearch = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchTerm) => {
    navigate(`/searchresults/${searchTerm}`);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearchSubmit} />
    </>
  );
};

export default MovieSearch;
