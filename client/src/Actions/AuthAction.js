import * as AuthApi from "../Api/ApiCalls";

export const Login_User = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.Login_User(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILURE", data: error });
  }
};

export const Register_User = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.Register_User(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILURE", data: error });
  }
};

export const Log_Out = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
