import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layout/Layout";
import MyLists from "./Pages/MyLists";
import Plists from "./Pages/Plists";
import MovieDetail from "./Pages/MovieDetail";
import SearchResults from "./Pages/SearchResults";
import CreateWatchlist from "./Pages/CreateWatchlist";
import Auth from "./Pages/Auth";
// import WatchlistProvider from "./Store/WatchlistProvider";
import { AuthContextProvider } from "./Store/auth-context";
import Watchlist from "./Pages/Watchlist";
import MyDay from "./Pages/MyDay";
import MyPlanned from "./Pages/MyPlanned";
import WatchListMovieDetail from "./Components/WatchListMovieDetail/WatchlistMovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    ),
    errorelement: <div>404</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "myday", element: <MyDay /> },
      { path: "myplanned", element: <MyPlanned /> },
      {
        path: "watchlist",
        element: <MyLists />,
      },
      { path: "watchlist/:watchlistId", element: <Watchlist /> },
      {
        path: "watchlist/:watchlistId/:movieId",
        element: <WatchListMovieDetail />,
      },
      { path: "plists", element: <Plists /> },
      { path: "movies/:movieId", element: <MovieDetail /> },
      { path: "searchresults/:searchquery", element: <SearchResults /> },
      { path: "createwatchlist", element: <CreateWatchlist /> },
      { path: "editwatchlist/:watchlistId", element: <CreateWatchlist /> },
      { path: "auth", element: <Auth /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
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
