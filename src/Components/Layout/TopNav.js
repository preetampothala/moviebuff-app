import { NavLink, useSearchParams, Link } from "react-router-dom";
import styles from "./TopNav.module.css";
import MovieSearch from "../Search/MovieSearch";
import { useContext } from "react";
import AuthContext from "../../Store/auth-context";

const NavLinks = ({ isLoggedIn, isLogin, onLogout }) => {
  if (!isLoggedIn) {
    return (
      <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
        {isLogin ? "Sign up" : "Login"}
      </Link>
    );
  }

  return (
    <ul>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/watchlist"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          end
        >
          My Lists
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/plists"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          end
        >
          Lists
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          end
        >
          <button className={styles.button} onClick={onLogout}>
            Log out
          </button>
        </NavLink>
      </li>
    </ul>
  );
};

const TopNav = () => {
  const [searchParams] = useSearchParams();
  const isLogin =
    !searchParams.get("mode") || searchParams.get("mode") === "login";
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const headerStyle = isLoggedIn
    ? styles.header
    : `${styles.header} ${styles.headerAuth}`;

  return (
    <header className={headerStyle}>
      <NavLink
        to={isLoggedIn ? "/" : "/auth"}
        className={
          isLoggedIn ? styles.logo : `${styles.logo} ${styles.logo_auth}`
        }
      >
        MovieBuff
      </NavLink>

      {isLoggedIn && (
        <div className={styles.searchWrapper}>
          <MovieSearch />
        </div>
      )}
      <nav className={isLoggedIn ? styles.navarea : styles.navarea_auth}>
        <NavLinks
          isLoggedIn={isLoggedIn}
          isLogin={isLogin}
          onLogout={authCtx.logout}
        />
      </nav>
    </header>
  );
};

export default TopNav;
