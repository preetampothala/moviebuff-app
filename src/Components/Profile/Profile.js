import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// const Profile = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Avatar onClick={handleClick}>P</Avatar>
//       {/* <span onClick={handleClick}>Profile Name</span> */}
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         <MenuItem onClick={handleClose}>My Day</MenuItem>
//         <MenuItem onClick={handleClose}>My Planned</MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default Profile;
import styles from "./Profile.module.css";

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = (event) => {
    setShowDropdown(false);
  };

  return (
    <div className={styles.profile_dropdown} onClick={handleShowDropdown}>
      <img
        className={styles.profile_icon}
        src="https://picsum.photos/40"
        alt="profile"
      />

      {/* <span>Profile Name</span> */}
      <div
        className={`${styles.dropdown_menu} ${
          showDropdown ? `${styles.show}` : ""
        }`}
      >
        <Link
          to={`/myday`}
          onClick={handleClick}
          className={styles.dropdownitem}
        >
          <span className={`material-icons-outlined ${styles.icon}`}>
            light_mode
          </span>
          My Day
        </Link>
        <Link
          to={`/myplanned`}
          onClick={handleClick}
          className={styles.dropdownitem}
        >
          <span className={`material-icons-outlined ${styles.icon}`}>
            calendar_month
          </span>
          My Planned
        </Link>
      </div>
    </div>
  );
};

export default Profile;
