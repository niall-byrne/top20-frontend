import React, { useState } from "react";
import { DrawerDiv, UnderDrawer, DrawerMessage } from "./drawer.styles";

export const messages = {
  DrawerTitle: "Top 20 Albums",
};

const Drawer = ({ drawerHeight, navBarHeight, data, focus }) => {
  const [open, setOpen] = useState(false);
  const albums = data.data.topalbums.album;

  const openDrawer = (focus) => {
    if (open) setOpen(false);
    setTimeout(() => {
      setOpen(true);
      console.log("Drawer: ", albums[focus]);
    }, 250);
  };

  React.useEffect(() => {
    if (focus) {
      openDrawer(focus);
    } else {
      setOpen(false);
    }
  }, [focus]);

  return (
    <div>
      <UnderDrawer>
        <DrawerMessage drawerHeight={drawerHeight}>
          <div>{messages.DrawerTitle}</div>
        </DrawerMessage>
      </UnderDrawer>
      <DrawerDiv drawerHeight={drawerHeight} navBarHeight={navBarHeight}>
        {focus ? (
          <div className={`drawer ${open ? "open" : "closed"}`}>
            <div className="zoomed">
              <img
                className="zoomedImage"
                alt={albums[focus].name}
                src={albums[focus].image[3]["#text"]}
              />
            </div>
            <div className="note">
              {albums[focus].name}
              <div className="artist">{albums[focus].artist.name}</div>
              <div className="plays">{albums[focus].playcount} listens</div>
              <div className={`lastfmlink info lastfm"`}>
                <img
                  onClick={() => console.log(albums[focus].url)}
                  style={{ width: 50, height: 50 }}
                  alt="last.fm"
                  src={"./images/lastfm.png"}
                />
              </div>
            </div>
          </div>
        ) : null}
      </DrawerDiv>
    </div>
  );
};

export default Drawer;
