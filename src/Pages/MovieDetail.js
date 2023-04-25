import { React } from "react";
import { useLoaderData } from "react-router-dom";
import Movie from "../Components/Movie/Movie";
// import Loader from "../Components/UI/Loader";

const MovieDetail = () => {
  const data = useLoaderData();

  // const params = useParams();
  // const { movieId } = params;
  // const [movie, setMovie] = useState(null);
  // const [cast, setCast] = useState({});
  // const [crew, setCrew] = useState({});
  // const [reviews, setReviews] = useState({});
  // const [watchProviders, setWatchProviders] = useState({});
  // const [trailer, setTrailer] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!movieId) return;
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const data1 = await fetch(
  //         ` https://api.themoviedb.org/3/movie/${movieId}?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US`
  //       );
  //       const data2 = await fetch(
  //         `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US`
  //       );
  //       const data3 = await fetch(
  //         `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=e418fdbca3c905f8b53cababd0a32c2f`
  //       );
  //       const data4 = await fetch(
  //         `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US&page=1`
  //       );
  //       const data5 = await fetch(
  //         `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US`
  //       );
  //       const movieDetail = await data1.json();
  //       const castDetail = await data2.json();
  //       const watchProviderDetail = await data3.json();
  //       const reviews = await data4.json();
  //       const trailer = await data5.json();
  //       if (
  //         !movieDetail ||
  //         !castDetail ||
  //         !watchProviderDetail ||
  //         !reviews ||
  //         !trailer
  //       ) {
  //         throw new Error("Something went wrong!");
  //       }
  //       setMovie(movieDetail);
  //       setCast(castDetail.cast);
  //       setCrew(castDetail.crew);
  //       setReviews(reviews);
  //       setTrailer(trailer);
  //       setWatchProviders(watchProviderDetail.results.US);
  //       return [movieDetail, castDetail, watchProviderDetail, reviews, trailer];
  //     } catch (error) {
  //       // setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [movieId]);

  // if (data.error) {
  //   const error = data.error ? data.error.message : "";
  //   console.log(error);
  //   return (
  //     <div>
  //       <p>{error}</p>
  //     </div>
  //   );
  // }

  // if (loading) return <Loader />;

  // if (!movie) return null;
  if (!data.movieDetail) return null;
  else {
    const {
      movieDetail,
      castDetail,
      reviews,
      trailer,
      watchProviderDetail,
      similarMovies,
    } = data;
    return (
      <Movie
        movie={movieDetail}
        cast={castDetail.cast}
        watchProviders={watchProviderDetail}
        crew={castDetail.crew}
        reviews={reviews}
        trailer={trailer}
        similar={similarMovies}
      />
    );
  }
};

export default MovieDetail;
export const movieLoader = async ({ params }) => {
  const { movieId } = params;
  console.log(movieId);
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
    const data6 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=e418fdbca3c905f8b53cababd0a32c2f&language=en-US&page=1`
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
    const movieDetail = await data1.json();
    const castDetail = await data2.json();
    const watchProviderDetail = await data3.json();
    const reviews = await data4.json();
    const trailer = await data5.json();
    const similar = await data6.json();
    const similarMovies = similar.results;
    return {
      movieDetail,
      castDetail,
      watchProviderDetail,
      reviews,
      trailer,
      similarMovies,
    };
  } catch (error) {
    return { error: error };
  } finally {
  }
};
