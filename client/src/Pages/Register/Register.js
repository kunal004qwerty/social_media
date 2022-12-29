import React, { useContext, useRef } from "react";

import { useNavigate, Link } from "react-router-dom";
// import { Register_Call } from "../../Api/ApiCall";
// import { AuthContext } from "../../Context/AuthContext";
import "./Register.scss";

import { useDispatch } from "react-redux";
import { Register_User } from "../../Actions/AuthAction";

import { useSelector } from "react-redux";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.AuthReducer);

  // const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log(user);
      // Register_Call(user, dispatch);
      dispatch(Register_User(user));
    }
    e.target.reset();
  };
  return (
    <div className="Register">
      <div className="Register_Wrapper">
        <div className="Register_Right">
          <form className="Register_Box" onSubmit={handleClick}>
            <input
              placeholder="User_Name"
              ref={username}
              className="Register_Input"
              required
            />
            <input
              placeholder="Email_Id"
              ref={email}
              className="Register_Input"
              type="email"
              required
            />
            <input
              placeholder="Password"
              ref={password}
              className="Register_Input"
              type="password"
              minLength="6"
              required
            />
            <input
              placeholder="Password_Again"
              ref={passwordAgain}
              className="Register_Input"
              type="password"
              required
            />
            <button className="Register_Button Button" type="submit">
              Sign_Up
            </button>
            {error && <span>Username already exist</span>}
            <Link to={"/login"} className="Register_div">
              <button className="Register_Register_Button Button">
                Log_Into_Account
              </button>
            </Link>
          </form>
        </div>

        <div className="Register_Left">
          <h3 className="Register_Logo">Social_Media</h3>
          <span className="Register_Desc">
            Connect with Friends and the word around you on Social_Media
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
