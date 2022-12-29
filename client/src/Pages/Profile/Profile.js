import React, { useEffect, useState } from "react";
import "./Profile.scss";

import SideBar from "../../Components/SideBar/SideBar";
import TopBar from "../../Components/TopBar/TopBar";
import Feeds from "../../Components/Feeds/Feeds";
import RightBar from "../../Components/RightBar/RightBar";

import NoCoverPitchure from "../../assets/noCover.png";
import NoAvatar from "../../assets/noAvatar.png";

import img01 from "../../assets/person/1.jpeg";
import img02 from "../../assets/posts/1.jpeg";

// !---------------------------REDIX
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { Get_User } from "../../Actions/UserActions";
import { useParams } from "react-router";
import axios from "axios";
import * as UserApi from "../../Api/UserCall";

const Profile = () => {
  const dispatch = useDispatch();
  const ProfileUserId = useParams().userId;
  // console.log(ProfileUserId);
  // const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   // Get all the data of user
  //   const fetchUser = async () => {
  //     const response = await axios.get(`/users?userId=${ProfileUserId}`);
  //     if (response.status === 200) {
  //       setUser(response.data);
  //     }
  //   };

  //   fetchUser();
  // }, [ProfileUserId]);
  // const {
  //   coverPitchure,
  //   desc,
  //   followers,
  //   followings,
  //   profilePitchure,
  //   relationship,
  //   username,
  // } = user;
  // !--------------------------------
  const [profileUser, setProfileUser] = useState({});

  const Actualuser = useSelector((state) => state.AuthReducer.user);
  // console.log(Actualuser);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (ProfileUserId === Actualuser._id) {
        setProfileUser(Actualuser);
        console.log("Hello");
      } else {
        const profileUser = await UserApi.Get_User({ userId: ProfileUserId });
        setProfileUser(profileUser.data);
      }
    };
    fetchProfileUser();
  }, [ProfileUserId]);
  // console.log(profileUser);

  return (
    <div>
      <TopBar />
      <div className="Profile">
        <SideBar location={"Profile_Page"} />
        <div className="Profile_Right">
          <div className="Profile_Right_Top">
            <div className="Profile_Cover">
              <img
                className="Profile_Cover_Img"
                src={
                  profileUser.coverPicture
                    ? PF + profileUser.coverPicture
                    : PF + "./noPic/002.jpg"
                }
                alt=""
              />
              <img
                className="Profile_User_Img"
                src={
                  profileUser.profilePicture
                    ? PF + profileUser.profilePicture
                    : PF + "./noPic/puppy01.jpg"
                }
                alt=""
              />
            </div>
            <div className="Profile_Info">
              <h4 className="Profile_Info_Name">{profileUser.username}</h4>
              <span className="Profile_Info_Desc">
                {profileUser.desc
                  ? profileUser.desc
                  : "Write somthing about yourself"}
              </span>
            </div>
          </div>
          <div className="Profile_Right_Bottom">
            <Feeds />
            <RightBar profile user={Actualuser} ProfileUser={profileUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
