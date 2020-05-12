import styled from "styled-components";

const openDrawer = `
  opacity: 1;
  width: 100vw;
  transform: translateX(0%);
  transition: all 0.5s;
`;
const closedDrawer = `
  opacity: 0.1;
  width: 100vw;
  transform: translateX(-100%);
  transition: all 0.5s;
`;

const isOpen = (open) => {
  if (open) return openDrawer;
  return closedDrawer;
};

export const Switch = styled.div`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.drawerHeight};
  transition: all 0.5s;
  background-color: #c0c0c0;
  width: 100vw;

  ${(props) => isOpen(props.openDrawer)}
`;

export const Note = styled.div`
  padding: 15px;
  font-size: 1em;
`;

export const Artist = styled.div`
  font-size: 1em;
`;

export const Plays = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  font-size: 0.8em;
`;

export const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 3px;
  z-index: 10;

  .lastfmlink:hover {
    filter: grayscale(0%);
  }

  .lastfmlink {
    filter: grayscale(100%);
  }
  .lastfm {
    filter: contrast(300%);
  }
`;

export const DrawerDiv = styled.div`
  margin-top: ${(props) => props.navBarHeight};
  height: ${(props) => props.drawerHeight};
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100vw;
`;

export const ZoomedAlbum = styled.div``;

export const ZoomedCover = styled.div`
  border-style: solid;
  border-color: black;
  border-width: 1px;
  height: calc(${(props) => props.drawerHeight} - 2px);
  width: calc(${(props) => props.drawerHeight} - 2px);

  img {
    height: calc(${(props) => props.drawerHeight} - 2px);
    width: calc(${(props) => props.drawerHeight} - 2px);
  }
`;

export const UnderDrawer = styled.div`
  position: absolute;
  z-index: -10;
`;

export const DrawerMessage = styled.div`
  height: ${(props) => props.drawerHeight};
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
