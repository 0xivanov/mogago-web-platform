import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  @media (min-width: 768px) {
    padding: 2rem;
    width: 100%;
    margin: 0;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1B3B35;
  padding: 0 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #1B3B35;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1B3B35;
  }
`;

const SubmitButton = styled.button`
  background-color: #9B8AFB;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background-color: #8A79FA;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
`;

interface FormData {
  name: string;
  phone: string;
  email: string;
  position: string;
  years: string;
  city: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    position: '',
    years: '',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <FormContainer>
      <Title>Изпрати ни уменията си</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Име и Фамилия:</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Иван Иванов"
          />
        </FormGroup>

        <FormGroup>
          <Label>Години:</Label>
          <Input
            type="number"
            name="years"
            value={formData.years}
            onChange={handleChange}
            placeholder="25"
            min="0"
            max="120"
          />
        </FormGroup>

        <FormGroup>
          <Label>Град:</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="София"
          />
        </FormGroup>

        <FormGroup>
          <Label>Телефонен номер:</Label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+359 ..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Email (Електронна поща):</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ivanivanov@gmail.com"
          />
        </FormGroup>

        <FormGroup>
          <Label>Настояща позиция:</Label>
          <Input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Шофьор на..."
          />
        </FormGroup>

        <Disclaimer>
          при натискане на "Изпрати", се съгласявате да споделите информацията си и да я запазим.
        </Disclaimer>

        <SubmitButton type="submit">Изпрати</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ContactForm; 