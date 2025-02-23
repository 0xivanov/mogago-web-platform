import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Categories from './components/Categories';
import SkillGrid from './components/SkillGrid';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F5F5F5;
  width: 100%;
  max-width: 100vw;
  // overflow-x: hidden;
  position: relative;

  @media (max-width: 768px) {
    padding-bottom: 80px; /* Add padding for mobile navigation */
  }
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleCategorySelect = (categoryId: string) => {
    // Clear any existing highlight
    setSelectedCategory(null);
    
    // Wait for scroll animation to complete before highlighting
    setTimeout(() => {
      setSelectedCategory(categoryId);
      // Clear the highlight after 2 seconds
      setTimeout(() => {
        setSelectedCategory(null);
      }, 2000);
    }, 800); // Adjust this timing based on your scroll animation duration
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Categories onCategorySelect={handleCategorySelect} />
        <SkillGrid 
          selectedCategory={selectedCategory}
          selectedSkills={selectedSkills}
          onSkillToggle={handleSkillToggle}
        />
        <ContactForm selectedSkills={selectedSkills} />
      </MainContent>
      <Footer />
      <MobileNavigation />
    </AppContainer>
  );
}

export default App; 