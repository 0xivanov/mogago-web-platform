import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const FormPageContainer = styled.div`
  background-color: #ff5533;
  display: flex;
  justify-content: center;
  padding: 1rem;

  flex-direction: column;
  align-items: center;
`;

const FormCard = styled.div`
  background-color: green;
  color: #f9f9f9;
  padding: 2rem;
  border-radius: 20px;
  width: 70%;
  height: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    padding: 1rem;
    width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  background-color: #333;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid #666;

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`;

const HobbyGrid = styled.div`
  background-color: blue;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 0.8rem;

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    gap: 0.5rem;
  }
`;

const Dropdown = styled.select`
  padding: 0.8rem;
  border: 1px solid #666;
  border-radius: 10px;
  font-size: 0.9rem;
  background-color: #333;
  color: #f9f9f9;
  outline: none;
  flex: 1;

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    padding: 0.6rem;
    font-size: 0.8rem;
  }
`;

const HobbyButton = styled.button`
  padding: 0.8rem;
  border: 1px solid #666;
  border-radius: 10px;
  font-size: 0.9rem;
  background-color: ${({ isSelected }) => (isSelected ? '#f9c846' : '#333')};
  color: ${({ isSelected }) => (isSelected ? '#1d1d1d' : '#f9f9f9')};
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#e5b93e' : '#444')};
  }

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    padding: 0.6rem;
    font-size: 0.8rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #f9c846;
  color: #1d1d1d;
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #e5b93e;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    sex: '',
    age: '',
    hobbies: [],
  });

  const hobbies = [
    'Cooking',
    'Gardening',
    'Photography',
    'Sewing',
    'General Construction',
    'Carpentry',
    'Ceramics',
    'Electronics',
  ];

  const hobbiesBg = [
    'Дърворезба',
    'Грънчарство(керамика)',
    'Тъкачество',
    'Изработка на бижута',
    'Кожарство',
    'Ковачество(металообработка)',
    'Килимарство',
    'Плетиво и плетене на една кука',
    'Стъклопис и витражи',
    'Ваяне(скулптура)',
    'Иконопис',
    'Рисуване върху коприна',
    'Изработка на свещи',
    'Тъкане на дантели',
    'Плетене на кошници',
    'Изработка на мебели',
    'Реставрация на антики',
    'Шев и кройка(шиене на дрехи)',
    'Книговезане',
    'Изработване на ножове',
    'Пирография(горене върху дърво)',
    'Декупаж',
    'Работa с макраме',
    'Изработка на сапуни и козметика',
    'Пчеларство(восък и пчелни продукти)',
    'Друго'
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleHobby = (hobby) => {
    setFormData((prevState) => {
      const isSelected = prevState.hobbies.includes(hobby);
      const updatedHobbies = isSelected
        ? prevState.hobbies.filter((item) => item !== hobby)
        : [...prevState.hobbies, hobby];
      return { ...prevState, hobbies: updatedHobbies };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    navigate('/confirmation');
  };

  return (
    <FormPageContainer>
      <Header>
        <img src="/logo.png" alt="Moga Go Logo" className="logo" />
      </Header>
      <FormCard>
        <Title>I have a hobby</Title>
        <Description>
          Tell us more about yourself and your hobbies. Fill out the questionnaire so we can understand your strengths.
        </Description>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Име"
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
            name="age"
            type="number"
            placeholder="Възраст"
            onChange={handleChange}
            required
            min="18"
            max="80"
          />
          <DropdownContainer>
            <Dropdown name="city" onChange={handleChange} required>
              <option value="">Град</option>
              <option value="City 1">Град 1</option>
              <option value="City 2">Град 2</option>
              <option value="City 3">Град 3</option>
              <option value="Other">Other</option>
            </Dropdown>
            <Dropdown name="sex" onChange={handleChange} required>
              <option value="">Пол</option>
              <option value="Male">Мъж</option>
              <option value="Female">Жена</option>
            </Dropdown>
          </DropdownContainer>
          {formData.city === 'Other' && (
            <Input
              name="customCity"
              placeholder="Enter your city"
              onChange={handleChange}
              required
            />
          )}
          <HobbyGrid>
            {hobbiesBg.map((hobby) => (
              <HobbyButton
                name='hobby'
                key={hobby}
                isSelected={formData.hobbies.includes(hobby)}
                onClick={() => toggleHobby(hobby)}
                type="button"
              >
                {hobby}
              </HobbyButton>
            ))}
          </HobbyGrid>
          {formData.hobbies.includes('Друго') && (
            <Input
              name="customHobby"
              placeholder="Enter your hobby"
              onChange={handleChange}
              required
            />
          )}
          <SubmitButton type="submit">Send</SubmitButton>
        </Form>
      </FormCard>
    </FormPageContainer>
  );
}

export default FormPage;
