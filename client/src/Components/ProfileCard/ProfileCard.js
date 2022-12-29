import "./ProfileCard.scss";
import React from "react";

import img01 from "../../assets/posts/2.jpeg";
import img02 from "../../assets/person/8.jpeg";

// !---------------------------REDIX
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {
    username,
    coverPicture,
    profilePicture,
    desc,
    followings,
    followers,
  } = user;
  // console.log(user);

  return (
    <div className="Profile_Card">
      <div className="Profile_Cover">
        <img
          className="Profile_Cover_Img"
          src={coverPicture ? PF + coverPicture : PF + "./noPic/002.jpg"}
          alt=""
        />
        <img
          className="Profile_User_Img"
          src={
            profilePicture ? PF + profilePicture : PF + "./noPic/puppy01.jpg"
          }
          // src={user.profilePitchure || NoAvatar}
          alt=""
        />
      </div>
      <div className="Profile_Desc">
        <span className="Profile_Name">{username}</span>
        <span>{desc ? desc : "Write about yourself"}</span>
      </div>

      <div className="follow_Status">
        <hr />
        <div>
          <div className="follow">
            <span className="follow_Num">
              {followings ? followings.length : 0}
            </span>
            <span className="follow_text">Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span className="follow_Num">
              {followers ? followers.length : 0}
            </span>
            <span className="follow_text">Fillowers</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProfileCard;
