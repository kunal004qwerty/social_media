import React from "react";
import "./Home.scss";

import TopBar from "../../Components/TopBar/TopBar";
import SideBar from "../../Components/SideBar/SideBar";
import Feeds from "../../Components/Feeds/Feeds";
import RightBar from "../../Components/RightBar/RightBar";

const Home = () => {
  return (
    <div>
      <TopBar />
      <div className="Home_Container">
        <SideBar />
        <Feeds />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
