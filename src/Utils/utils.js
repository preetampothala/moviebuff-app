const genre_ids = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
export const getGenres = (genreids) => {
  return genreids
    .reduce((acc, genre) => {
      const genreName = genre_ids.filter((id) => id.id === genre)[0].name;
      return acc + genreName + ", ";
    }, "")
    .slice(0, -2);
};

export const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
};

export const dayName = (day) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Unknown";
  }
};
export const monthName = (month) => {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Unknown";
  }
};
export const watchlist = {
  watchlistname: "Watchlist 1",
  watchlistdescription: "Watchlist 1 description",
  addedMovies: [
    {
      adult: false,
      backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
      genre_ids: [28, 878, 12],
      id: 27205,
      original_language: "en",
      original_title: "Inception",
      overview:
        "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
      popularity: 126.341,
      poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
      release_date: "2010-07-15",
      title: "Inception",
      video: false,
      vote_average: 8.361,
      vote_count: 33474,
    },
    {
      adult: false,
      backdrop_path: "/yY76zq9XSuJ4nWyPDuwkdV7Wt0c.jpg",
      genre_ids: [28, 53, 878],
      id: 577922,
      original_language: "en",
      original_title: "Tenet",
      overview:
        "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      popularity: 75.507,
      poster_path: "/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg",
      release_date: "2020-08-22",
      title: "Tenet",
      video: false,
      vote_average: 7.204,
      vote_count: 8195,
    },
  ],
};

export const plannedMovies = [
  {
    date: "April 13, 2023",
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 27205,
    original_language: "en",
    original_title: "Inception1",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception1",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
  {
    date: "April 13, 2023",
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 272055,
    original_language: "en",
    original_title: "Inception2",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception2",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
  {
    date: "April 14, 2023",
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 272054,
    original_language: "en",
    original_title: "Inception3",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception3",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
  {
    date: "April 14, 2023",
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 272053,
    original_language: "en",
    original_title: "Inception4",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception4",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
  {
    date: "April 16, 2023",
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 272052,
    original_language: "en",
    original_title: "Inception5",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception5",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
  {
    date: "April 17, 2023",
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 272051,
    original_language: "en",
    original_title: "Inception6",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception6",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
];

export const movie = [
  {
    adult: false,
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genre_ids: [28, 878, 12],
    id: 27205,
    original_language: "en",
    original_title: "Inception",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    popularity: 109.513,
    poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    release_date: "2010-07-15",
    title: "Inception",
    video: false,
    vote_average: 8.362,
    vote_count: 33445,
  },
  {
    adult: false,
    backdrop_path: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    genre_ids: [18, 28, 80, 53],
    id: 155,
    original_language: "en",
    original_title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    popularity: 89.895,
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-14",
    title: "The Dark Knight",
    video: false,
    vote_average: 8.509,
    vote_count: 29448,
  },
  {
    adult: false,
    backdrop_path: "/mfJepkInUbiZ0mFXFhDNz8ko6Zr.jpg",
    genre_ids: [18, 9648, 878],
    id: 1124,
    original_language: "en",
    original_title: "The Prestige",
    overview:
      "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.",
    popularity: 44.628,
    poster_path: "/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    release_date: "2006-10-19",
    title: "The Prestige",
    video: false,
    vote_average: 8.202,
    vote_count: 14018,
  },
];
