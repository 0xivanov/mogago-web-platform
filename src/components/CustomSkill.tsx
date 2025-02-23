import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #1B3B35;
  margin-bottom: 1rem;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1.5rem;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  resize: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

interface CustomSkillProps {
  value: string;
  onChange: (text: string) => void;
}

const CustomSkill: React.FC<CustomSkillProps> = ({ value, onChange }) => {
  return (
    <Container>
      <Title>Изпуснахме ли твое умение?</Title>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Допълни с твои думи..."
      />
    </Container>
  );
};

export default CustomSkill; 