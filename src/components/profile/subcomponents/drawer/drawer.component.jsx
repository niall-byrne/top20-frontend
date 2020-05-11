import React from "react";
import { DrawerDiv, DrawerMessage } from "./drawer.styles";

export const messages = {
  DrawerTitle: "Top 20 Albums",
};

const Drawer = ({ drawerHeight, navBarHeight }) => {
  return (
    <DrawerDiv drawerHeight={drawerHeight} navBarHeight={navBarHeight}>
      <DrawerMessage>{messages.DrawerTitle}</DrawerMessage>
    </DrawerDiv>
  );
};

export default Drawer;
