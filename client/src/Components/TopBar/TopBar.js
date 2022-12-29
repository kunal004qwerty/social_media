import "./TopBar.scss";
import React, { useState } from "react";

// !----------------------------------------------------ICONS
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

// !-------------------------------------------------- DUMMY_PITCHURE
import Img01 from "../../assets/person/8.jpeg";
import { Link, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// import * as UserApi from "../../Api/UserCall";
import * as ApiCalls from "../../Api/ApiCalls";
import { Log_Out } from "../../Actions/AuthAction";

const TopBar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const myStorage = window.localStorage;

  const dispatch = useDispatch();

  const handleLogout = () => {
    // myStorage.removeItem("store");
    // dispatch(Log_Out());
    myStorage.clear();
    window.location.reload();
  };

  const user = useSelector((state) => state.AuthReducer.user);
  // console.log(user);

  return (
    <div className="Theme">
      <div className="topbar_Container">
        <div className="topbar_Left">
          <Link to={"/"}>
            <span className="logo">Social_Media</span>
          </Link>
        </div>
        <div className="topbar_Center">
          <div className="searchbar">
            <SearchIcon className="search_icon" />
            <input
              className="searchInput"
              placeholder="Search for friends"
            ></input>
          </div>
        </div>
        <div className="topbar_Right">
          <div className="topbar_Links">
            <span className="topbar_Link">Home_Page</span>

            <span className="topbar_Link">Time_Line</span>
          </div>
          <div className="topbar_Icons">
            <div className="topbar_IconItem">
              <PersonIcon />
              <span className="topbar_IconBadge">1</span>
            </div>
            <Link to={"/messenger"} className="Link">
              <div className="topbar_IconItem">
                <ChatIcon />
                <span className="topbar_IconBadge">3</span>
              </div>
            </Link>
            <div className="topbar_IconItem">
              <NotificationsIcon />
              <span className="topbar_IconBadge">1</span>
            </div>
          </div>

          <Link to={`/profile/${user._id}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "noPic/puppy01.jpg"
              }
              alt=""
              className="topbar_Img"
            ></img>
          </Link>
          <LogoutIcon className="Log_Out_Button" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
