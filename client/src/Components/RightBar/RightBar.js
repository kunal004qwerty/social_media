import "./RightBar.scss";

import React, { useState, useEffect } from "react";

import Birthday from "../../assets/gift.png";
import Add from "../../assets/ad.png";

import { Users } from "../../DummyData";
import Online from "../Online/Online";
// !-----------------------------------------------ICONS
import EditIcon from "@mui/icons-material/Edit";

// !-----------------------------------------------IMG
import img005 from "../../assets/person/8.jpeg";
import img006 from "../../assets/person/7.jpeg";
import img007 from "../../assets/person/5.jpeg";
import ProfileModal from "../ProfileModal/ProfileModal";

// !------------------------------------------------ REDUX
import { useSelector } from "react-redux";
import { Get_User_Friends } from "../../Api/UserCall";
import { User_Conversations } from "../../Api/ConversationsCall";

const HomeRightBar = () => {
  const [onlineusers, setOnlineusers] = useState([]);
  const [conversations, setConversations] = useState([]);

  const user = useSelector((state) => state.AuthReducer.user);

  console.log(user._id);
  useEffect(() => {
    const Get_Conversations = async () => {
      try {
        const { data } = await User_Conversations(user._id);
        setConversations(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    Get_Conversations();
  }, [user._id]);

  const checkOnlineStatus = (conversations) => {
    const ConversationsMember = conversations?.members?.find(
      (member) => member !== user._id
    );
    console.log({ ConversationsMember });
    const online = onlineusers.find(
      (user) => user?.userId === ConversationsMember
    );
    return online ? true : false;
  };

  return (
    <>
      <div className="Birthday_Container">
        <img src={Birthday} alt="" className="Birthday_Img" />
        <span className="Birthday_text">
          <b>Pola Foster</b> and <b>Other friends</b> have a birthday today
        </span>
      </div>
      <img src={Add} alt="" className="RightBar_Add" />
      <h4 className="RightBar_Title">Online Friends</h4>
      <ul className="RightBar_Friend_List">
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
    </>
  );
};

const ProfileRightBar = ({ user, ProfileUser }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // console.log("ProfileUserId", ProfileUser._id);
  // console.log("CurrentUserId", user._id);
  // if (ProfileUser._id == user._id) {
  // console.log("true");
  // } else {
  // console.log("false");
  // }

  useEffect(() => {
    const GET_FRIENDS = async () => {
      try {
        const { data } = await Get_User_Friends(user?._id);
        setFriends(data);
        // console.log(friends);
      } catch (error) {
        console.log(error);
      }
    };
    GET_FRIENDS();
  }, [user?._id]);

  const posts = useSelector((state) => state.PostReducer.posts);

  return (
    <>
      <div className="RightBar_Tilte_Div">
        <h4 className="RightBar_Title">Profile Information</h4>
        {ProfileUser._id == user._id ? (
          <>
            <EditIcon
              className="Edit_Icon"
              onClick={() => setModalOpened(true)}
            />{" "}
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </>
        ) : (
          ""
        )}
      </div>

      <div className="RightBar_Info">
        <div className="RightBar_Info_Item">
          <span className="RightBar_Info_Key">Works at</span>
          <span className="RightBar_Info_Value">{ProfileUser?.work}</span>
        </div>
        <div className="RightBar_Info_Item">
          <span className="RightBar_Info_Key">Lives in</span>
          <span className="RightBar_Info_Value">{ProfileUser?.city}</span>
        </div>
        <div className="RightBar_Info_Item">
          <span className="RightBar_Info_Key">Status</span>
          <span className="RightBar_Info_Value">
            {" "}
            {ProfileUser.relationship}
            {/* {user.relationship === 1
              ? "Single"
              : user.relationship === 1
              ? "Married"
              : "."} */}
          </span>
        </div>
      </div>
      {/* --------------- */}
      <div className="follow_Status">
        <hr />
        <div>
          <div className="follow">
            <span className="follow_Num">
              {ProfileUser.followings ? ProfileUser.followings.length : 0}
            </span>
            <span className="follow_text">Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span className="follow_Num">
              {posts
                ? posts.filter((post) => post.userId === user._id).length
                : 0}
            </span>
            <span className="follow_text">Posts</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span className="follow_Num">
              {ProfileUser.followers ? ProfileUser.followers.length : 0}
            </span>
            <span className="follow_text">Fillowers</span>
          </div>
        </div>
        <hr />
      </div>

      {/* -------------- */}
      <h4 className="RightBar_Title">User Friends</h4>
      <div className="RightBar_Followings">
        {friends.map((o) => (
          <div className="RightBar_Following">
            <img
              src={
                o?.profilePicture ? PF + o.profilePicture : PF + "noAvatar.png"
              }
              alt=""
              className="RightBar_Following_Img"
            />
            <span className="RightBar_Following_Name">{o.username}</span>
          </div>
        ))}

        <img src={Add} alt="" className="RightBar_Add" />
      </div>
    </>
  );
};

const RightBar = ({ profile, user, ProfileUser }) => {
  return (
    <div className="RightBar">
      <div className="RightBar_Wrapper">
        {profile ? (
          <ProfileRightBar user={user} ProfileUser={ProfileUser} />
        ) : (
          <HomeRightBar />
        )}
      </div>
    </div>
  );
};

export default RightBar;
