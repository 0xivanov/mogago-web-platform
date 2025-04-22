import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Home, Phone, Info, BookOpen } from 'lucide-react';



const HeaderContainer = styled.header`
  background-color: #1B3B35;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 768px) {
    padding: 1rem 3rem;
  }
`;

const LogoMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LogoLink = styled.a`
  display: block;
  text-decoration: none;
  height: 40px;
  margin-right: 1rem;
`;

const LogoImage = styled.img`
  height: 100%;
  width: auto;
`;

const HeaderText = styled.div`
  color: white;
  font-style: italic;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 80px;
  right: 1rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(160, 130, 200, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
  width: 220px;
`;


const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1B3B35;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f7f5fb;
  }

  svg {
    color: #b085e6; /* Lavender icon */
    font-size: 1.2rem;
  }
`;


const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <LogoMenuContainer>
        <LogoLink href="/">
          <LogoImage src="/favilogo.png" alt="Moga.go Logo" />
        </LogoLink>
        <MenuButton onClick={() => setMenuOpen(prev => !prev)}>
          <i className="fas fa-bars"></i>
        </MenuButton>
      </LogoMenuContainer>

      <HeaderText>Добре дошъл в Moga.go!</HeaderText>
      <Description>Избери своите умения</Description>

      {menuOpen && (
        <DropdownMenu>
          <MenuItem to="/" onClick={() => setMenuOpen(false)}>
            <Home size={18} /> Начало
          </MenuItem>
          <MenuItem to="/contacts" onClick={() => setMenuOpen(false)}>
            <Phone size={18} /> Контакти
          </MenuItem>
          <MenuItem to="/about" onClick={() => setMenuOpen(false)}>
            <Info size={18} /> За Нас
          </MenuItem>
          <MenuItem to="/courses" onClick={() => setMenuOpen(false)}>
            <BookOpen size={18} /> Обучения
          </MenuItem>
        </DropdownMenu>
      )}
      
    </HeaderContainer>
  );
};

export default Header;
