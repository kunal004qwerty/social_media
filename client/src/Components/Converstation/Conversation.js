import React, { useEffect, useState } from "react";
import "./Conversation.scss";
import img01 from "../../assets/person/1.jpeg";
import axios from "axios";
import noAvatar from "../../assets/noAvatar.png";
import { Get_User } from "../../Api/UserCall";

const Conversation = ({ conversations, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // console.log(conversations);
  // console.log(online);

  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== currentUser._id);
    // console.log(friendId);

    const getUserData = async () => {
      try {
        const { data } = await Get_User({ userId: friendId });
        // console.log(data);
        setUserData(data);
        // console.log(userData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
    // console.log(userData);
  }, [currentUser, conversations]);

  return (
    <div className="Conversation">
      <img
        className="Conversation_Img"
        src={
          userData?.profilePicture
            ? PF + userData?.profilePicture
            : PF + "./noPic/puppy01.jpg"
        }
        alt=""
      />
      <span className="Conversation_Name">{userData?.username}</span>
    </div>
  );
};

export default Conversation;
