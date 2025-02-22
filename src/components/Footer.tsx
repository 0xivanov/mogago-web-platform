import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1B3B35;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
    gap: 2rem;
    text-align: left;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 0;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.div`
  color: white;
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 0;
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    margin: 0;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const Link = styled.a`
  color: white;
  text-decoration: underline;
  opacity: 0.8;
  font-size: 0.8rem;
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
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
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