import React, { useState, useEffect } from "react";
import MovieCarouselView from "../Components/MovieCarouselView/MovieCarouselView";
import Loader from "../Components/UI/Loader";
import Modal from "../Components/UI/Modal/Modal";
import AuthContext from "../Store/auth-context";
import styles from "./Home.module.css";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMovie, setModalMovie] = useState([]);
  const API_KEY = "e418fdbca3c905f8b53cababd0a32c2f";
  const AuthCtx = React.useContext(AuthContext);
  console.log(AuthCtx.userid);
  console.log(AuthCtx.username);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        //Fetch popular movies
        const data1 = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        );
        // Fetch streaming movies
        const data2 = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
        );

        // Fetch now playing movies
        const data3 = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data4 = await fetch(
          `https://api.themoviedb.org/3/movie/157336/recommendations?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US&page=1`
        );
        const data5 = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const data6 = await fetch(
          // `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (
          !data1.ok ||
          !data2.ok ||
          !data3.ok ||
          !data4.ok ||
          !data5.ok ||
          !data6.ok
        ) {
          throw new Error("Something went wrong!");
        }
        const nowPlayingMovies = await data1.json();
        const topratedmovies = await data2.json();
        const popularMovies = await data3.json();
        const recommendedMovies = await data4.json();
        const trendingMovies = await data5.json();
        const upcomingMovies = await data6.json();
        if (!popularMovies || !topratedmovies || !nowPlayingMovies) {
          throw new Error("Something went wrong!");
        }
        setPopularMovies(popularMovies.results);
        setTopRatedMovies(topratedmovies.results);
        setNowPlayingMovies(nowPlayingMovies.results);
        setRecommendations(recommendedMovies.results);
        setTrendingMovies(trendingMovies.results);
        setUpcomingMovies(upcomingMovies.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToWatchlist = (movie) => {
    setShowModal(true);
    setModalMovie(movie);
    // console.log(`Added ${movie.id} to watchlist!`);
  };
  const modalonCloseHandler = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {showModal && (
        <Modal modalMovie={modalMovie} onClose={modalonCloseHandler}></Modal>
      )}
      <div className="home">
        {AuthCtx.isLoggedIn && (
          <div className={styles.home_welcome}>
            <h1>Welcome back, {AuthCtx.username}!</h1>
          </div>
        )}
        <MovieCarouselView
          title="Now Playing"
          movies={nowPlayingMovies}
          movieCount={nowPlayingMovies.length}
          onAddToWatchlist={handleAddToWatchlist}
          type="movie"
          parent="home"
        />
        <MovieCarouselView
          title="Recommended Movies"
          movies={recommendations}
          movieCount={recommendations.length}
          onAddToWatchlist={handleAddToWatchlist}
          type="movie"
          parent="home"
        />
        <MovieCarouselView
          title="Popular Movies"
          movies={trendingMovies}
          movieCount={trendingMovies.length}
          onAddToWatchlist={handleAddToWatchlist}
          type="movie"
          parent="home"
        />
        <MovieCarouselView
          title="Top Rated"
          movies={topRatedMovies}
          movieCount={topRatedMovies.length}
          onAddToWatchlist={handleAddToWatchlist}
          type="movie"
          parent="home"
        />
        <MovieCarouselView
          title="Upcoming Movies"
          movies={upcomingMovies}
          movieCount={upcomingMovies.length}
          onAddToWatchlist={handleAddToWatchlist}
          type="movie"
          parent="home"
        />
      </div>
    </>
  );
}
export default Home;
