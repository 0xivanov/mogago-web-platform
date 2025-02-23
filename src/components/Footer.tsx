import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1B3B35;
  padding: 1.0rem 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-align: left;
  min-width: 100%;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0;
  min-width: 50px;
  justify-content: flex-start;
  flex-shrink: 0;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.4rem;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.div`
  color: white;
  opacity: 0.8;
  font-size: 0.75rem;
  margin: 0;
  flex: 1;
  text-align: center;
  white-space: nowrap;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 120px;
  justify-content: flex-end;
  align-items: flex-end;
  flex-shrink: 0;
`;

const Link = styled.a`
  color: white;
  text-decoration: underline;
  opacity: 0.8;
  font-size: 0.7rem;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  
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