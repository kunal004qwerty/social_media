import React from "react";
import "./App.scss";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import ProfileModal from "./Components/ProfileModal/ProfileModal";
import Messenger from "./Pages/Messenger/Messanger";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.AuthReducer.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/messenger"
            element={!user ? <Navigate to="/" /> : <Messenger />}
          />
          <Route path={`/profile/:userId`} element={<Profile />} />
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}

      {/* <Profile /> */}

      {/* <Login /> */}
      {/* <Register /> */}

      {/* <Auth /> */}

      {/* <ProfileModal /> */}
    </>
  );
};

export default App;
