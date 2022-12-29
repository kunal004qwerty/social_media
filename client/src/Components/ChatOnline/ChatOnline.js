import React, { useEffect, useState } from "react";
import "./ChatOnline.scss";
import img01 from "../../assets/person/1.jpeg";
import axios from "axios";
import { Get_User_Friends } from "../../Api/UserCall";
import { useSelector } from "react-redux";

const ChatOnline = ({ onlineusers, currentId, setCurrentChat }) => {
  // console.log(onlineusers);
  // console.log(currentId);
  const [friends, setFriends] = useState([]);

  const [onlineFriends, setOnlineFriends] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const user = useSelector((state) => state.AuthReducer.user);
  // console.log(user._id);
  // console.log(online);

  useEffect(() => {
    const GET_FRIENDS = async () => {
      try {
        const { data } = await Get_User_Friends(user?._id);
        setFriends(data);
      } catch (error) {
        console.log(error);
      }
    };
    GET_FRIENDS();
  }, [user?._id]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineusers?.includes(f._id)));
  }, [friends, onlineusers]);

  // console.log({ onlineusers });

  // console.log({ friends });

  // console.log({ onlineFriends });
  const handleClick = async (profileuser) => {
    try {
      const res = await axios.get(
        `/conversations/find/${user._id}/${profileuser._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ChatOnline">
      {onlineFriends.map((o) => (
        <div key={o._id}>
          <div className="ChatOnline_Friend" onClick={() => handleClick(o)}>
            <div className="ChatOnline_Img_Container">
              <img
                src={
                  o?.profilePicture
                    ? PF + o.profilePicture
                    : PF + "noPic/noAvatar.png"
                }
                alt=""
                className="ChatOnline_Img"
              />
              <div
                className="ChatOnline_Badge"
                style={{ color: onlineFriends ? "#51e200" : "red" }}
              ></div>
            </div>
            <div className="ChatOnline_name_div">
              <span className="ChatOnline_Name">{o.username}</span>
              <span
                className="Online"
                style={{ color: onlineFriends ? "#51e200" : "" }}
              >
                {onlineFriends ? "Online" : "OffLine"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
