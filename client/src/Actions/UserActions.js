import * as CallApi from "../Api/UserCall";

export const Get_User =
  ({ userId: userId, username: username }) =>
  async (dispatch) => {
    dispatch({ type: "GET_USER_START" });
    try {
      const { data } = await CallApi.Get_User({
        userId: userId,
        username: username,
      });

      dispatch({ type: "GET_USER_SUCCESS", data: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_USER_FAILURE", data: error });
    }
  };

export const Update_User = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await CallApi.Update_User(id, formData);
    console.log("Action ko receive hoa hy ye : ", data);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const Follow_User =
  ({ id: id, userId: data }) =>
  async (dispatch) => {
    dispatch({ type: "FOLLOW_USER", data: id });
    CallApi.Follow_User({ id: id, userId: data });
  };

export const Un_Follow_User =
  ({ id, userId: data }) =>
  async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER", data: id });
    CallApi.Un_Follow_User({ id, userId: data });
  };
