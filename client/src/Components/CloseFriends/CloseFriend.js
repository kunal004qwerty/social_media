import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CloseFriend.scss";
import { useDispatch } from "react-redux";
import { Follow_User, Un_Follow_User } from "../../Actions/UserActions";
import { useSelector } from "react-redux";
import axios from "axios";
import { create_Conversations } from "../../Api/ConversationsCall";

const CloseFriend = ({ person }) => {
  const dispatch = useDispatch();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.AuthReducer.user);
  // console.log("user._id", user._id);
  // console.log("person._id", person._id);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(user.followings.includes(person?._id));
  }, [user, person._id]);

  // console.log(followed);

  const HandleFollow = () => {
    // dispatch(Follow_User(person._id, user));

    if (followed) {
      dispatch(Un_Follow_User({ id: person._id, userId: user._id }));
    } else {
      dispatch(Follow_User({ id: person._id, userId: user._id }));
      setFollowed(!followed);
    }

    try {
      axios.post("/conversations", {
        senderId: user._id,
        receiverId: person._id,
      });
    } catch (error) {
      console.log(error);
    }

    // followed
    //   ? dispatch(Un_Follow_User({ id: person._id, userId: user._id }))
    //   : dispatch(Follow_User({ id: person._id, userId: user._id }));
    // setFollowed(!followed);
    // try {

    //   const res = await axios.put(`/users/${person._id}/unfollow`, {
    //     userId: user._id,
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div>
      <li className="SideBar_Friends">
        <div className="SideBar_Friends_Desc">
          <img
            className="SideBar_Friend_Img"
            src={
              person.profilePicture
                ? PF + person.profilePicture
                : PF + "./noPic/puppy01.jpg"
            }
            alt=""
          />
          <span className="SideBar_Friend_Name">{person.username}</span>
        </div>

        <button className="SideBar_Friend_Follow_Button" onClick={HandleFollow}>
          {followed ? "Unfollow" : "follow"}
        </button>
      </li>
    </div>
  );
};

export default CloseFriend;
