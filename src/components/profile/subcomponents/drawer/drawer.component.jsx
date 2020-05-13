import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  DrawerDiv,
  UnderDrawer,
  Switch,
  ZoomedAlbum,
  ZoomedCover,
  DrawerMessage,
  Note,
  Artist,
  Plays,
  Info,
} from "./drawer.styles";
import Assets from "../../../../configuration/assets";
import messages from "../../../../configuration/messages";

// Configuration

export const DrawerDelay = 150;

const Drawer = ({ drawerHeight, navBarHeight, data, focus }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const albums = data.data.topalbums.album;
  const { t } = useTranslation();

  const openDrawer = (focus) => {
    if (open) {
      setOpen(false);
    }
    setTimeout(() => {
      setOpen(true);
      setCurrent(focus);
    }, DrawerDelay);
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
      {current ? <div></div> : null}
      <UnderDrawer>
        <DrawerMessage drawerHeight={drawerHeight}>
          <h2>{t(messages.DrawerTitle)}</h2>
        </DrawerMessage>
      </UnderDrawer>
      <DrawerDiv drawerHeight navBarHeight={navBarHeight}>
        {current ? (
          <Switch openDrawer={open} drawerHeight={drawerHeight}>
            <div>
              <ZoomedAlbum drawerHeight={drawerHeight}>
                <Info>
                  <a
                    className="lastfmlink"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={albums[current].url}
                  >
                    <img
                      className="lastfm"
                      style={{ width: 50, height: 50 }}
                      alt={t(messages.DrawerAltLastFM)}
                      src={Assets.LastFMLogo}
                    />
                  </a>
                </Info>
                <ZoomedCover drawerHeight={drawerHeight}>
                  <img
                    alt={albums[current].name}
                    src={albums[current].image[3]["#text"]}
                  />
                </ZoomedCover>
              </ZoomedAlbum>
            </div>
            <Note>
              {albums[current].name}
              <Artist>{albums[current].artist.name}</Artist>
              <Plays>
                {albums[current].playcount}{" "}
                {t(messages.DrawerListensPluralNoun)}
              </Plays>
            </Note>
          </Switch>
        ) : (
          <Switch openDrawer={open} drawerHeight={drawerHeight}></Switch>
        )}
      </DrawerDiv>
    </div>
  );
};

export default Drawer;
