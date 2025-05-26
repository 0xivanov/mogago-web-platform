import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, isBusinessUser } from '../../contexts/AuthContext';

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

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #1B3B35;
  
  a {
    color: #1B3B35;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BusinessLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isBusinessUser()) {
      navigate('/business/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    if (!formData.email || !formData.password) {
      setError('Моля, попълнете всички полета');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/business/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, 'business');
        navigate('/business/dashboard');
      } else {
        setError(data.error || 'Неуспешно влизане');
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
        <Title>Вход за бизнеси</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Имейл адрес</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Въведете вашия имейл адрес"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Парола</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Въведете вашата парола"
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Влизане...' : 'Влез'}
          </Button>
        </Form>

        <RegisterLink>
          Нямате акаунт? <Link to="/business/register">Регистрирайте се тук</Link>
        </RegisterLink>
      </Container>
    </PageWrapper>
  );
};

export default BusinessLogin; 