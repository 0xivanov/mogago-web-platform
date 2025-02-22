import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1B3B35;
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (min-width: 768px) {
    padding: 1rem 3rem;
  }
`;

const LogoLink = styled.a`
  display: block;
  text-decoration: none;
  height: 40px;
`;

const LogoImage = styled.img`
  height: 100%;
  width: auto;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoLink href="/">
        <LogoImage src="/logo.png" alt="Moga.go Logo" />
      </LogoLink>
      <MenuButton>
        <i className="fas fa-bars"></i>
      </MenuButton>
    </HeaderContainer>
  );
};

export default Header; 