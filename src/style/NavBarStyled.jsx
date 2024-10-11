import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Colors
const primaryColor = '#182d40';
const secondaryColor = '#ffffff';
const blueColor = '#009bdf';
const darkGrey = '#2e2e2e';

// Navbar Container
export const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${primaryColor};
  color: ${secondaryColor};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Logo/Brand
export const Logo = styled.h1`
  font-size: 1.8rem;
  color: ${secondaryColor};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Navigation Links Container
export const NavLinksContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Navigation Links
export const NavLink = styled(Link)`
  color: ${secondaryColor};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: ${blueColor};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Log Off Button
export const LogOffButton = styled.button`
  background-color: ${blueColor};
  color: ${secondaryColor};
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${darkGrey};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;
