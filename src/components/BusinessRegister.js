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
  color: #fff;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid #666;

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    padding: 0.4rem;
    font-size: 0.9rem;
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

function BusinessRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormPageContainer>
      <Header>
        <img src="/logo.png" alt="Moga Go Logo" className="logo" />
      </Header>
      <FormCard>
        <Title>Business Registration</Title>
        <Description>
          Register your business to connect with skilled craftspeople and artisans.
        </Description>
        <Form>
          <Input
            name="name"
            placeholder="Business Name"
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <SubmitButton
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              console.log(formData);
              try {
                const response = await fetch('http://localhost:9090/api/business/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData)
                });
                if (response.ok) {
                  navigate('/confirmation');
                } else {
                  console.error('Registration failed');
                }
              } catch (error) {
                console.error('Error registering business:', error);
              }
            }}
          >
            Register
          </SubmitButton>
        </Form>
      </FormCard>
    </FormPageContainer>
  );
}

export default BusinessRegister; 