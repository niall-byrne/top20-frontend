// Displays the User Profile

import React from "react";
import { NavBarHeight } from "../header/header.component";

import Title from "./subcomponents/title/title.component";
import Chart from "./subcomponents/chart/chart.component";
import Drawer from "./subcomponents/drawer/drawer.component";

const DrawerHeight = "33vh";
const TitleHeight = "40px";

const Profile = ({ data }) => {
  const count = data.data.topalbums.album.length;
  return (
    <div>
      <Drawer
        className="section"
        drawerHeight={DrawerHeight}
        navBarHeight={NavBarHeight}
      >
        <div data-testid="Profile">Profile</div>
      </Drawer>
      <Title titleHeight={TitleHeight} count={count} />
      <Chart
        drawerHeight={DrawerHeight}
        navBarHeight={NavBarHeight}
        titleHeight={TitleHeight}
        data={data}
        count={count}
      >
        Chart Area
      </Chart>
    </div>
  );
};

export default Profile;
