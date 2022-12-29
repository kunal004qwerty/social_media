import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

// import { AuthContext } from "../../Context/AuthContext";
// import { Login_Call } from "../../Api/ApiCall";

import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { Login_User } from "../../Actions/AuthAction";

import { useSelector } from "react-redux";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.AuthReducer);

  // console.log(userData);

  // const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(Login_User(data));
  };

  return (
    <div className="Login">
      <div className="Login_Wrapper">
        <div className="Login_Left">
          <h3 className="Login_Logo">Social_Media</h3>
          <span className="Login_Desc">
            Connect with Friends and the word around you on Social_Media
          </span>
        </div>
        <div className="Login_Right">
          <form className="Login_Box" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type={"email"}
              required
              className="Login_Input"
              ref={email}
            />
            <input
              placeholder="Password"
              type={"password"}
              required
              className="Login_Input"
              ref={password}
              minLength="6"
            />
            <button className="Login_Button Button" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="24px" />
              ) : (
                "Log_In"
              )}
            </button>

            <span className="Login_Fail">
              {error && "Wrong Email or password"}
            </span>
            {/* <span className="Login_Forget">Forget Password ?</span> */}
            <Link to={"/register"} className="Register_div">
              <button className="Login_Register_Button Button">
                {isFetching ? (
                  <CircularProgress color="inherit" size="24px" />
                ) : (
                  "Create_A_New_Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
