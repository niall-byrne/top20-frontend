import styled from "styled-components";

// Add Media Queries to Adjust NavBar Size

export const NavbarFixed = styled.div`
  background-color: #c0c0c0;
  width: 100vw;
  height: 50px;
  position: fixed;
`;

export const NavbarItems = styled.div`
  padding-left: 10px;
  font-size: 1.2em;
  z-index: 10;
`;

export const Navbar = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-template-rows: 50px;

  img {
    height: 40px;
    padding-top: 2px;
  }

  img:hover {
    filter: opacity(50%);
  }
`;
