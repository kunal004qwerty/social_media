import React, { useRef, useState } from "react";
import "./ProfileModal.scss";

import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Upload_Img } from "../../Actions/UploadAction";
import { Update_User } from "../../Actions/UserActions";
import { useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  // console.log(param);
  // console.log("formData", formData);

  const status = useRef();

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleimageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      console.log(UserData);
      try {
        dispatch(Upload_Img(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;

      try {
        dispatch(Upload_Img(data));
      } catch (err) {
        console.log(err);
      }
    }
    // console.log({ UserData });
    // const sendData = { UserData: UserData };
    // console.log(sendData);
    dispatch(Update_User(param.userId, UserData));
    setModalOpened(false);
    // try {
    //   console.log({ UserData });
    //   const res = await axios.put("/users/" + param.userId, UserData);
    //   //  {
    //   //   headers: {
    //   //     "Content-Type": "multipart/data",
    //   //   },
    //   // });
    //   console.log({ res });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Modal
      //   centered
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      // opened="true"
      size="55%"
      onClose={() => setModalOpened(false)}
      className="Modal"
    >
      {/* Modal content */}
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div></div>
        <div className="Input_Field_Div">
          <input
            type="text"
            // ref={username}
            className="Info_Input"
            placeholder="User_Name"
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
        </div>
        <div className="Input_Field_Div">
          <input
            type="text"
            // ref={worksIn}
            className="Info_Input"
            placeholder="Works_At"
            onChange={handleChange}
            name="work"
            value={formData.work}
          />
        </div>
        <div className="Input_Field_Div">
          <input
            type="text"
            // ref={livesIn}
            className="Info_Input"
            placeholder="Lives_In"
            onChange={handleChange}
            name="city"
            value={formData.city}
          />
        </div>
        <div className="Input_Field_Div">
          <input
            type="text"
            ref={status}
            className="Info_Input"
            placeholder="Status"
            onChange={handleChange}
            name="relationship"
            value={formData.relationship}
          />
        </div>

        <div className="Uplaod_image_Div">
          <div className="Uploading_Img">
            Profile Image
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              name="profileImage"
              onChange={HandleimageChange}
            />
            {profileImage && (
              <div className="UploadImage_Container">
                <img
                  className="UploadImage_Hollogram"
                  src={URL.createObjectURL(profileImage)}
                  alt=""
                />
                <CloseIcon
                  className="UploadImage_cancel"
                  onClick={() => setProfileImage(null)}
                />
              </div>
            )}
          </div>
          <div className="Uploading_Img">
            Cover Image
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              name="coverImage"
              onChange={HandleimageChange}
            />
            {coverImage && (
              <div className="UploadImage_Container">
                <img
                  className="UploadImage_Hollogram"
                  src={URL.createObjectURL(coverImage)}
                  alt=""
                />
                <CloseIcon
                  className="UploadImage_cancel"
                  onClick={() => setCoverImage(null)}
                />
              </div>
            )}
          </div>
        </div>
        <button className="Button" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
