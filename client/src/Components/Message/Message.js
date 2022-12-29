import React, { useEffect, useState } from "react";
import "./Message.scss";
import { format } from "timeago.js";

import img01 from "../../assets/person/1.jpeg";
import { Get_User } from "../../Api/UserCall";
import axios from "axios";

const Message = ({ message, Own, currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (typeof message?.senderId !== "undefined") {
          if (message.senderId !== currentUser?._id) {
            const FriendId = message?.senderId;
            const { data } = await Get_User({
              userId: FriendId,
            });
            if (data?.profilePicture) {
              setUserData(PF + data?.profilePicture);
            } else {
              setUserData(PF + "noPic/noAvatar.png");
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [message]);
  // console.log(userData);

  return (
    <div className={Own ? "Message Own" : "Message"}>
      <div className="Message_Top">
        {/* <img
          className="Message_Img"
          src={
            Own
              ? PF + currentUser?.profilePicture
                ? PF + currentUser?.profilePicture
                : PF + "noPic/noAvatar.png"
              : userData
          }
          alt=""
        /> */}
        {Own ? (
          <img
            className="Message_Img"
            src={
              currentUser?.profilePicture
                ? PF + currentUser?.profilePicture
                : PF + "noPic/noAvatar.png"
            }
            alt=""
          />
        ) : (
          <img className="Message_Img" src={userData} alt="" />
        )}
        <p className="Message_Text">{message?.text}</p>
      </div>
      <div className="Message_Bottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
