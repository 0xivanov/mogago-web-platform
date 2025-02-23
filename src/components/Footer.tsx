import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1B3B35;
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  margin-top: auto;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.div`
  color: white;
  opacity: 0.8;
  font-size: 0.8rem;
  text-align: center;
  line-height: 1.4;
  flex: 1;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  flex-shrink: 0;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  font-size: 0.8rem;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <SocialLink href="https://www.instagram.com/mogago.bg/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </SocialLink>
      </SocialLinks>
      
      <Copyright>
        moga.go 2025
        <br />
        all rights reserved
      </Copyright>

      <Links>
        <Link href="/privacy">privacy policy</Link>
        <Link href="/terms">terms and conditions</Link>
      </Links>
    </FooterContainer>
  );
};

export default Footer; 