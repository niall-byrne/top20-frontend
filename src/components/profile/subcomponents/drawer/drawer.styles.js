import styled from "styled-components";

export const DrawerDiv = styled.div`
  margin-top: ${(props) => props.navBarHeight};
  height: ${(props) => props.drawerHeight};
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100vw;

  .open {
    background-color: #c0c0c0;
    opacity: 1;
    width: 100vw;
    transform: translateX(0%);
  }

  .closed {
    opacity: 0.5;
    width: 100vw;
    transform: translateX(-100%);
  }

  .drawer {
    display: flex;
    flex-direction: row;
    height: ${(props) => props.drawerHeight};
    transition: all 0.5s;
  }

  .note {
    padding: 15px;
    font-size: 1em;

    .artist {
      font-size: 1em;
    }
    .plays {
      padding-top: 10px;
      padding-bottom: 20px;
      font-size: 0.8em;
    }
    .info {
      display: grid;
      justify-content: flex-start;
    }
    .lastfm {
      filter: contrast(300%);
    }
  }

  .lastfmlink:hover {
    filter: grayscale(0%);
  }

  .lastfmlink {
    filter: grayscale(100%);
  }

  .zoomed {
    border-style: solid;
    border-color: black;
    border-width: 1px;
    .zoomedImage {
      height: calc(${(props) => props.drawerHeight} - 2px);
      width: calc(${(props) => props.drawerHeight} - 2px);
    }
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
