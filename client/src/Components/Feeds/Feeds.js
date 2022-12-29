import "./Feeds.scss";
import React, { useEffect, useState } from "react";

import Share from "../Share/Share";
// import { Posts } from "../../DummyData";
import Post from "../Post/Post";

// !---------------------------REDIX
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// !---------------------------

import { Get_All_Timeline_Post } from "../../Actions/PostsAction";

const Feeds = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const Post_Reducer_Data = useSelector((state) => state.PostReducer);
  let { posts, isFetching, error } = Post_Reducer_Data;

  useEffect(() => {
    dispatch(Get_All_Timeline_Post(user._id));
  }, [user._id]);

  const param = useParams();

  if (!posts) return "No Posts";
  // console.log(posts);
  // console.log(param);
  if (param.userId) {
    posts = posts.filter((post) => post.userId === param.userId);
  }

  return (
    <div className="feed">
      <div className="Feed_Wraper">
        <Share />

        {isFetching
          ? "Fetching Posts...."
          : posts.map((p) => <Post key={p._id} post={p} />)}
      </div>
    </div>
  );
};

export default Feeds;
