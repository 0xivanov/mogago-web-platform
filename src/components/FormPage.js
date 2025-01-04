import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SkillsGrid from './SkillsGrid';

const FormPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
`;

const LeftColumn = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const RightColumn = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #000;
  height: 40px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  height: 110px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  background-color: #f9c846;
  border: 1px solid #000;
  cursor: pointer;
  margin: 2rem auto 0;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  cursor: pointer;
`;

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    skills: [],
    skillsWithOwnWords: '',
    age: '',
    city: '',
  });
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        skills: selectedSkills.map(skillId => ({
          name: skillId.split('-')[1]
        })),
      };
      submissionData.age = Number(submissionData.age);

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/candidate/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        navigate('/confirmation');
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSkillToggle = (skillId) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      }
      return [...prev, skillId];
    });
  };

  return (
    <FormPageContainer>
      <Header>
        <img src="/logo.png" alt="Moga Go Logo" className="logo" />
      </Header>
      <SkillsGrid
        selectedSkills={selectedSkills}
        onSkillToggle={handleSkillToggle}
      />
      <FormCard>
        <FormGrid>
          <LeftColumn>
            <Input
              name="name"
              placeholder="Име Фамилия"
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              placeholder="Телефон"
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              placeholder="Имейл"
              onChange={handleChange}
              required
            />
            <Input
              name="position"
              placeholder="Настояща Позиция"
              onChange={handleChange}
              required
            />
          </LeftColumn>
          <RightColumn>
            <TextArea
              name="skillsWithOwnWords"
              placeholder="Допълни уменията си със свои думи"
              onChange={handleChange}
              required
            />
            <Input
              name="age"
              type="number"
              placeholder="Години"
              onChange={handleChange}
              required
            />
            <Input
              name="city"
              placeholder="Град"
              onChange={handleChange}
              required
            />
          </RightColumn>
        </FormGrid>
        <SubmitButton onClick={handleSubmit}>Изпрати</SubmitButton>
      </FormCard>
      <NavButtons>
        <NavButton>Общо обяви</NavButton>
        <NavButton>Наети хора</NavButton>
        <NavButton>Активни програми</NavButton>
        <NavButton>Активни програми</NavButton>
      </NavButtons>
    </FormPageContainer>
  );
}

export default FormPage;
