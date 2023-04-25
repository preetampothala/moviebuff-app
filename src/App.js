import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layout/Layout";
import MyLists from "./Pages/MyLists";
import Plists from "./Pages/Plists";
import MovieDetail from "./Pages/MovieDetail";
import SearchResults from "./Pages/SearchResults";
import CreateWatchlist from "./Pages/CreateWatchlist";
import EditWatchlist from "./Pages/EditWatchlist";
import Auth from "./Pages/Auth";
import WatchlistProvider from "./Store/WatchlistProvider";
import { AuthContextProvider } from "./Store/auth-context";
import Watchlist from "./Pages/Watchlist";
import MyDay from "./Pages/MyDay";
import MyPlanned from "./Pages/MyPlanned";
import ErrorPage from "./Pages/ErrorPage";
import WatchListMovieDetail from "./Components/WatchListMovieDetail/WatchlistMovieDetail";
import { tokenLoader, checkAuthLoader } from "./Utils/auth";
import { movieLoader } from "./Pages/MovieDetail";
// import AuthContext from "./Store/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
    // id: "root",
    children: [
      { index: true, element: <Home />, loader: checkAuthLoader },
      { path: "myday", element: <MyDay />, loader: checkAuthLoader },
      { path: "myplanned", element: <MyPlanned />, loader: checkAuthLoader },
      {
        path: "watchlist",
        element: <MyLists />,
        loader: checkAuthLoader,
      },
      {
        path: "watchlist/:watchlistId",
        element: <Watchlist />,
        loader: checkAuthLoader,
      },
      {
        path: "watchlist/:watchlistId/:movieId",
        element: <WatchListMovieDetail />,
        loader: checkAuthLoader,
      },
      { path: "plists", element: <Plists />, loader: checkAuthLoader },
      {
        path: "movies/:movieId",
        element: <MovieDetail />,
        loader: movieLoader,
        // loader: checkAuthLoader,
      },
      {
        path: "searchresults/:searchquery",
        element: <SearchResults />,
        loader: checkAuthLoader,
      },
      {
        path: "createwatchlist",
        element: <CreateWatchlist />,
        loader: checkAuthLoader,
      },
      {
        path: "editwatchlist/:watchlistId",
        element: <EditWatchlist />,
        loader: checkAuthLoader,
      },
    ],
  },
  {
    path: "auth",
    element: <Layout />,
    children: [{ index: true, element: <Auth /> }],
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <WatchlistProvider>
        <RouterProvider router={router} />
      </WatchlistProvider>
    </AuthContextProvider>
  );
}

export default App;
// <BrowserRouter>
//   <Routes>
//     <WatchlistProvider>
//       <Layout>
//         <Route path="/login" exact>
//           <Login />
//         </Route>
//         <Route path="/" exact>
//           <Redirect to="/home" />
//         </Route>
//         <Route path="/home" exact>
//           <Home />
//         </Route>
//         <Route path="/mylists" exact>
//           <MyLists />
//         </Route>
//         <Route path="/plists" exact>
//           <Plists />
//         </Route>
//         <Route path="/movies/:movieId">
//           <MovieDetail />
//         </Route>
//         <Route path="/searchresults/:searchquery">
//           <SearchResults />
//         </Route>
//         <Route path="/createwatchlist" exact>
//           <CreateWatchlist onAddWatch={onAddWatchlist} />
//         </Route>
//       </Layout>
//     </WatchlistProvider>
//   </Routes>
// </BrowserRouter>
// {
//   path: "auth",
//   element: <Layout />,
//   children: [{ index: true, element: <Auth /> }],
// },
