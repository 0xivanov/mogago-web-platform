import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo src="/logo.png" alt="Moga Go Logo" />
      <Nav>
        <NavLink href="#about">За нас</NavLink>
        <NavLink href="#contact">Контакти</NavLink>
        <NavLink href="#programs">Програми</NavLink>
        <NavLink href="#offers">Оферти</NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;