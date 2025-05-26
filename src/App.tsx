import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Categories from './components/Categories';
import SkillGrid from './components/SkillGrid';
import CustomSkill from './components/CustomSkill';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import { Routes, Route } from 'react-router-dom';
import Contacts from './pages/Contacts';
import About from './pages/About';
import BusinessLogin from './pages/Business/Login';
import BusinessRegister from './pages/Business/Register';
import BusinessDashboard from './pages/Business/Dashboard';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFF4E5;
  width: 100%;
  max-width: 100vw;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  position: relative;
  
  @media (min-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillsWithOwnWords, setSkillsWithOwnWords] = useState<string>('');

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

  const handleCustomSkillChange = (text: string) => {
    setSkillsWithOwnWords(text);
  };

  return (
    <AuthProvider>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Categories onCategorySelect={handleCategorySelect} />
                  <SkillGrid 
                    selectedCategory={selectedCategory}
                    selectedSkills={selectedSkills}
                    onSkillToggle={handleSkillToggle}
                  />
                  <CustomSkill 
                    value={skillsWithOwnWords}
                    onChange={handleCustomSkillChange}
                  />
                  <ContactForm 
                    selectedSkills={selectedSkills}
                    skillsWithOwnWords={skillsWithOwnWords}
                  />
                </>
              }
            />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
            
            {/* Business Routes */}
            <Route path="/business/login" element={<BusinessLogin />} />
            <Route path="/business/register" element={<BusinessRegister />} />
            <Route 
              path="/business/dashboard" 
              element={
                <ProtectedRoute requiredRole="business">
                  <BusinessDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </MainContent>
        <Footer />
        <MobileNavigation />
      </AppContainer>
    </AuthProvider>
  );
};

export default App; 