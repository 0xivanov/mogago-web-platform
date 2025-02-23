import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1B3B35; /* Ensure this matches the image */
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column; /* Stack logo/menu and text vertically */
  align-items: center; /* Center items horizontally */
  
  @media (min-width: 768px) {
    padding: 1rem 3rem;
  }
`;

const LogoMenuContainer = styled.div`
  display: flex; /* Align logo and menu button in a row */
  align-items: center; /* Center items vertically */
  justify-content: space-between; /* Space between logo and menu button */
  width: 100%; /* Full width to allow spacing */
`;

const LogoLink = styled.a`
  display: block;
  text-decoration: none;
  height: 40px;
  margin-right: 1rem; /* Add some space to the right of the logo */
`;

const LogoImage = styled.img`
  height: 100%;
  width: auto;
`;

const HeaderText = styled.div`
  background: none;
  border: none;
  color: white;
  font-size: 1rem; /* Adjust font size */
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  background: none;
  border: none;
  color: white;
  font-size: 2rem; /* Increase font size */
  font-weight: bold; /* Make it bold */
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoMenuContainer>
        <LogoLink href="/">
          <LogoImage src="/favilogo.png" alt="Moga.go Logo" />
        </LogoLink>
        <MenuButton>
          <i className="fas fa-bars"></i>
        </MenuButton>
      </LogoMenuContainer>
      <HeaderText>Добре дошъл в Moga.go!</HeaderText>
      <Description>Избери своите умения</Description>
    </HeaderContainer>
  );
};

export default Header;