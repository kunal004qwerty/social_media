import React, { useRef, useState } from "react";
import "./Share.scss";

import axios from "axios";
//! ----------------------ICONS
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import { dividerClasses } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// !---------------------------- IMPORT DUMMY_IMG
import img08 from "../../assets/person/8.jpeg";

// !---------------------------REDIX
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Upload_Img, Upload_Post } from "../../Actions/UploadAction";

// !------------------------CODE

const Share = () => {
  const desc = useRef();

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const isFetching = useSelector((state) => state.AuthReducer.isFetching);
  const { username, profilePicture, coverPicture } = user;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // console.log(user._id);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("button_Click");
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      console.log(file);
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      console.log(data);
      try {
        dispatch(Upload_Img(data));
      } catch (err) {
        console.log(err);
      }
    }
    try {
      dispatch(Upload_Post(newPost));
      resetShare();
    } catch (error) {
      console.log(error);
    }
  };

  // Reset Post Share
  const resetShare = () => {
    setFile(null);
    desc.current.value = "";
  };

  return (
    <div className="Share">
      <div className="Share_Wrapper">
        <div className="Share_Top">
          <img
            className="Share_Profile_Img"
            src={
              profilePicture ? PF + profilePicture : PF + "./noPic/puppy01.jpg"
            }
            alt=""
          />
          <input
            className="Share_Input"
            placeholder={"WHat in your Mind " + user.username + " ?"}
            ref={desc}
          />
        </div>
        <hr className="Share_hr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CloseIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="Share_Bottom" onSubmit={submitHandler}>
          <div className="Share_Options">
            <label htmlFor="file" className="Share_Option">
              <PermMediaIcon htmlColor="tomato" className="Share_Icon" />

              <span className="Share_Option_Text">Photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            {/* ------------- */}

            <div className="Share_Option">
              <LabelIcon htmlColor="green" className="Share_Icon" />
              <span className="Share_Option_Text">Tags</span>
            </div>

            <div className="Share_Option">
              <RoomIcon htmlColor="blue" className="Share_Icon" />
              <span className="Share_Option_Text">Locations</span>
            </div>

            <div className="Share_Option">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="Share_Icon" />
              <span className="Share_Option_Text">Feelings</span>
            </div>
          </div>
          <button className="Share_Button" type="submit">
            {isFetching ? " Uploading..." : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
