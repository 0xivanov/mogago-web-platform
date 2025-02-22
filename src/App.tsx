import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import SkillGrid from './components/SkillGrid';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F5F5F5;
  width: 100%;
  max-width: 100vw;
  // overflow-x: hidden;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  // overflow-x: hidden;
  position: relative;
  
  @media (min-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <SkillGrid />
        <ContactForm />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App; 