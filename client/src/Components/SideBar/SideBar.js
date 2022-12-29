import "./SideBar.scss";
import React, { useEffect, useState } from "react";

// import { Users } from "../../DummyData";
import CloseFriend from "../CloseFriends/CloseFriend";

// !---------------------------------------ICONS
// import RssFeedIcon from "@mui/icons-material/RssFeed";
// import ChatIcon from "@mui/icons-material/Chat";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import GroupsIcon from "@mui/icons-material/Groups";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import SchoolIcon from "@mui/icons-material/School";
import ProfileCard from "../ProfileCard/ProfileCard";
import { useSelector } from "react-redux";
import { Get_All_User } from "../../Api/UserCall";
// !---------------------------------

const SideBar = ({ location }) => {
  // console.log(location);
  const user = useSelector((state) => state.AuthReducer.user);
  const Post = useSelector((state) => state.PostReducer.posts);
  // console.log(user._id);
  // console.log(Post);
  // console.log("user._id", user._id);

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const Fetch_Person = async () => {
      const { data } = await Get_All_User();
      // console.log(data);
      setPersons(data);
    };
    Fetch_Person();
  }, []);

  return (
    <div className="SideBar">
      <div className="SideBar_Wrapper">
        {!(location == "Profile_Page") && <ProfileCard />}
        <hr className="SideBar_hr" />
        <h3 className="SIDE_BAR_HEADING">People you may know</h3>
        <ul className="SideBar_Friends_List">
          {/* -----FRIEND__LIST----- */}
          {persons.map((u) => {
            if (u?._id !== user._id) {
              return <CloseFriend key={u._id} person={u} />;
            }
          })}
          {/* ------------FRIEND_LIST_ENDS-------- */}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
