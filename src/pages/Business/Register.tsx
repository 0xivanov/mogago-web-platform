import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PageWrapper = styled.div`
  background-color: #FFF4E5;
  padding: 3rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  min-height: 60vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  background-color: #E6D9F6;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1B3B35;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #1B3B35;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #1B3B35;
  }
`;

const Button = styled.button`
  padding: 0.9rem 1.5rem;
  background-color: #1B3B35;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #16302b;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const InfoText = styled.p`
  color: #1B3B35;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-style: italic;
  opacity: 0.8;
`;

const BusinessRegister: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    activationCode: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.activationCode) {
      setError('Моля, попълнете всички полета');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Паролите не съвпадат');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/business/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          activation_code: formData.activationCode
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Use the login function from AuthContext instead of directly setting localStorage
        login(data.token, 'business');
        navigate('/business/dashboard');
      } else {
        setError(data.error || 'Неуспешна регистрация');
      }
    } catch (err) {
      setError('Възникна грешка. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <Title>Регистрация на бизнес</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Име на фирмата</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Въведете име на фирмата"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Телефонен номер</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Въведете телефонен номер"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Имейл адрес</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Въведете имейл адрес"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="activationCode">Код за активация</Label>
            <Input
              type="text"
              id="activationCode"
              name="activationCode"
              value={formData.activationCode}
              onChange={handleChange}
              placeholder="Въведете код за активация"
              required
            />
            <InfoText>За да получите код за активация, моля свържете се с администратор</InfoText>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Парола</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Въведете парола"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Потвърдете паролата</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Потвърдете паролата"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Регистриране...' : 'Регистрирай се'}
          </Button>
        </Form>
      </Container>
    </PageWrapper>
  );
};

export default BusinessRegister; 