import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #E6D7F5;
  padding: 0.75rem 1.5rem;
  transform: translateY(${props => props.$isVisible ? '0' : '100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
`;

const NavigationButton = styled.button`
  background: #1B3B35;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #2a5a50;
    transform: translateY(-1px);
  }

  i {
    font-size: 1rem;
  }
`;

const NavigationLink = styled.a`
  color: #1B3B35;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(27, 59, 53, 0.1);
    transform: translateY(-1px);
  }

  i {
    font-size: 1rem;
  }
`;

const ButtonText = styled.span`
  font-weight: 500;
`;

const MobileNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const categoriesSection = document.querySelector('.categories-section');
      const formSection = document.getElementById('contact-form');
      
      if (categoriesSection && formSection) {
        const categoriesRect = categoriesSection.getBoundingClientRect();
        const formRect = formSection.getBoundingClientRect();
        
        // Show when scrolled past categories but not yet at form
        setIsVisible(categoriesRect.bottom < 0 && formRect.top > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      const headerOffset = 100;
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <NavigationContainer $isVisible={isVisible}>
      <NavigationButton onClick={scrollToForm}>
        <i className="fas fa-arrow-down"></i>
        <ButtonText>Готово</ButtonText>
      </NavigationButton>
      <NavigationLink href="#categories" onClick={(e) => {
        e.preventDefault();
        const categoriesElement = document.querySelector('.categories-section');
        if (categoriesElement) {
          categoriesElement.scrollIntoView({ behavior: 'smooth' });
        }
      }}>
        <ButtonText>обратно към категории</ButtonText>
        <i className="fas fa-arrow-up"></i>
      </NavigationLink>
    </NavigationContainer>
  );
};

export default MobileNavigation; 