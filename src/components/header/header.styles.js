import styled from "styled-components";

// Add Media Queries to Adjust NavBar Size

export const NavbarContainer = styled.div`
  background-color: #c0c0c0;
  width: 100vw;
  height: ${(props) => props.NavBarHeight};
  position: absolute;
  z-index: 10;
`;

export const NavbarItems = styled.div`
  padding-left: 10px;
  font-size: 1.2em;
  z-index: 10;
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  height: ${(props) => props.NavBarHeight};
  z-index: 10;

  div:last-child {
    margin-left: auto;
    padding-right: 10px;
    align-items: center;
    display: flex;
    z-index: 10;
    div {
      padding-left: 15px;
      cursor: pointer;

      img:hover {
        filter: opacity(50%);
        transform: rotate(10deg);
      }
    }
    div:hover {
      transform: scale(1.1);
    }
  }

  img {
    height: 40px;
    padding-top: 2px;
  }

  img:hover {
    filter: opacity(50%);
  }
`;
