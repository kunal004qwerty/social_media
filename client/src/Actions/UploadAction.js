import * as UploadApi from "../Api/UploadCall";

export const Upload_Img = (data) => async (dispatch) => {
  try {
    // console.log("Image upload successfull");
    console.log("data from uplaod_action", data);
    await UploadApi.Upload_Img(data);
  } catch (error) {
    console.log(error);
  }
};

export const Upload_Post = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.Upload_Post(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
