import React, { useEffect, useState } from "react";
import "./Post.scss";

import { format } from "timeago.js";
import Heart from "../../assets/heart.png";
import Like from "../../assets/like.png";
import Like_True from "../../assets/like_true.png";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

import { Users } from "../../DummyData";

// !---------------------------- IMPORT DUMMY_IMG
import img08 from "../../assets/person/8.jpeg";

// !---------------------------- REDUX
import { useSelector } from "react-redux";
import { Like_Post } from "../../Api/PostCall";
// !---------------------------REDIX
import { useDispatch } from "react-redux";

import { Get_User } from "../../Actions/UserActions";
import { useParams } from "react-router";
import axios from "axios";

const Post = ({ post }) => {
  // console.log(post);

  const dispatch = useDispatch();

  const Currentuser = useSelector((state) => state.AuthReducer.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { username, coverPitchure, profilePitchure, _id } = Currentuser;

  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));

  const likeHandler = () => {
    Like_Post(post._id, user._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
      // console.log(res);
    };
    fetchUser();
  }, [post.userId]);

  // !--------------------
  // console.log(post);
  // console.log(user);

  return (
    <div className="Post">
      <div className="Post_Wrapper">
        {/* ---------top----------- */}
        <div className="Post_Top">
          <div className="Post_Top_Left">
            <Link to={`/profile/${user._id}`}>
              <img
                className="Post_Profile_Img"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="Post_UserName">{user.username}</span>
            <span className="Post_Date">{format(post.createdAt)}</span>
          </div>
          <div className="Post_Top_Right">
            <MoreVertIcon />
          </div>
        </div>
        {/* -------center---------- */}
        <div className="Post_Center">
          <span className="Post_Text">{post?.desc}</span>
          <img
            src={post.img ? PF + post.img : ""}
            alt=""
            className="Post_Img"
          />
        </div>
        {/*------------Bottom------  */}
        <div className="Post_Bottom">
          <div className="Post_Bottom_Left">
            <img
              alt=""
              src={like ? Like_True : Heart}
              className="Like_Icon"
              onClick={likeHandler}
            />
            <img
              alt=""
              src={Like}
              className="Like_Icon"
              onClick={likeHandler}
            />
            <span className="Post_Like_Counter">{like} people Like It</span>
          </div>
          <div className="Post_Bottom_Right">
            <span className="Post_Comment_Text">3 Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
