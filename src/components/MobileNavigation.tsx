import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #E6D7F5;
  padding: 1rem;
  display: none;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
  }
`;

const NavigationButton = styled.button`
  background-color: #1B3B35;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: background-color 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: #152b27;
  }
`;

const NavigationLink = styled.a`
  color: #1B3B35;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem;
  // background-color: #1B3B35;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  i {
    font-size: 0.9rem;
  }
`;

const ButtonText = styled.span`
  white-space: nowrap;
`;

const MobileNavigation: React.FC = () => {
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
    <NavigationContainer>
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