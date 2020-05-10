// Displays the User Profile

import React from "react";
import Title from "./subcomponents/title/title.component";
import { Drawer, Chart } from "./profile.styles";
import { NavBarHeight } from "../header/header.component";

const DrawerHeight = "33vh";
const TitleHeight = "40px";

const Profile = () => {
  return (
    <div>
      <Drawer
        className="section"
        DrawerHeight={DrawerHeight}
        NavBarHeight={NavBarHeight}
      >
        <div data-testid="Profile">Profile</div>
      </Drawer>
      <Title TitleHeight={TitleHeight} />
      <Chart
        className="section"
        DrawerHeight={DrawerHeight}
        NavBarHeight={NavBarHeight}
        TitleHeight={TitleHeight}
      >
        Chart Area
      </Chart>
    </div>
  );
};

export default Profile;
