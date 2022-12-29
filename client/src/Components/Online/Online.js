import React from "react";
import "./Online.scss";

const Online = ({ user }) => {
  return (
    <div>
      <li className="RightBar_Friend">
        <div className="RightBar_Profile_Img_Container">
          <img
            className="RightBar_Profile_Img"
            src={user.profilePicture}
            alt=""
          />
          <span className="RightBar_Online"></span>
        </div>
        <span className="RightBar_Username">{user.username}</span>
      </li>
    </div>
  );
};

export default Online;
