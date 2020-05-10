// Displays the User Profile

import React from "react";
import Title from "./subcomponents/title/title.component";
import { Drawer, Chart } from "./profile.styles";
import { NavBarHeight } from "../header/header.component";

//testing
import Card from "./subcomponents/card/card.component";

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
        <Card
          title="If these trees could talk"
          number="1"
          image="https://www.gravatar.com/avatar/1fb821f534ddff07eb74482127a00ebd?d=retro&r=g&s=100"
          size="100"
        />
      </Chart>
    </div>
  );
};

export default Profile;
