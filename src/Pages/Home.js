import React, { useState, useEffect } from "react";
import MovieCarouselView from "../Components/MovieCarouselView/MoviePosterCarouselView";
import Loader from "../Components/UI/Loader";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [streamingMovies, setStreamingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "e418fdbca3c905f8b53cababd0a32c2f";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        //Fetch popular movies
        const data1 = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
        );
        // Fetch streaming movies
        const data2 = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
        );

        // Fetch now playing movies
        const data3 = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (!data1.ok || !data2.ok || !data3.ok) {
          throw new Error("Something went wrong!");
        }
        const popularMovies = await data1.json();
        const streamingMovies = await data2.json();
        const nowPlayingMovies = await data3.json();
        if (!popularMovies || !streamingMovies || !nowPlayingMovies) {
          throw new Error("Something went wrong!");
        }
        setPopularMovies(popularMovies.results);
        setStreamingMovies(streamingMovies.results);
        setNowPlayingMovies(nowPlayingMovies.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToWatchlist = (movie) => {
    console.log(`Added ${movie.id} to watchlist!`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home">
      <MovieCarouselView
        title="Popular Movies"
        movies={popularMovies}
        movieCount={popularMovies.length}
        onAddToWatchlist={handleAddToWatchlist}
        type="movie"
      />
      <MovieCarouselView
        title="Now Playing"
        movies={nowPlayingMovies}
        movieCount={popularMovies.length}
        onAddToWatchlist={handleAddToWatchlist}
        type="movie"
      />
      <MovieCarouselView
        title="Streaming"
        movies={streamingMovies}
        movieCount={popularMovies.length}
        onAddToWatchlist={handleAddToWatchlist}
        type="movie"
      />
    </div>
  );
}
export default Home;
