import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "../Components/Movie/Movie";
import Loader from "../Components/UI/Loader";

const MovieDetail = () => {
  const params = useParams();
  const { movieId } = params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState({});
  const [crew, setCrew] = useState({});
  const [reviews, setReviews] = useState({});
  const [watchProviders, setWatchProviders] = useState({});
  const [trailer, setTrailer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data1 = await fetch(
          ` https://api.themoviedb.org/3/movie/${movieId}?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US`
        );
        const data2 = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US`
        );
        const data3 = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=e418fdbca3c905f8b53cababd0a32c2f`
        );
        const data4 = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US&page=1`
        );
        const data5 = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US`
        );
        const movieDetail = await data1.json();
        const castDetail = await data2.json();
        const watchProviderDetail = await data3.json();
        const reviews = await data4.json();
        const trailer = await data5.json();
        if (
          !movieDetail ||
          !castDetail ||
          !watchProviderDetail ||
          !reviews ||
          !trailer
        ) {
          throw new Error("Something went wrong!");
        }

        setMovie(movieDetail);
        setCast(castDetail.cast);
        setCrew(castDetail.crew);
        setReviews(reviews);
        setTrailer(trailer);
        setWatchProviders(watchProviderDetail.results.US);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  if (!movie) return null;
  else {
    return (
      <Movie
        movie={movie}
        cast={cast}
        watchProviders={watchProviders}
        crew={crew}
        reviews={reviews}
        trailer={trailer}
      />
    );
  }
};

export default MovieDetail;
