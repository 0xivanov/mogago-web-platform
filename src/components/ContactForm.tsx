import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  scroll-margin-top: 100px;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 2rem;
    width: 100%;
    margin: 0;
  }
`;

const Notification = styled.div<{ type: 'success' | 'error' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: ${props => props.type === 'success' ? '#4CAF50' : '#f44336'};
  color: white;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
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
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    background-color: rgb(121, 102, 248);
  } 

  &:disabled {
    background-color: #C3B9EA;
    cursor: not-allowed;
    transform: none;
  }
`;

const ConsentContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-top: 0.25rem;
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: #1B3B35;
`;

const ConsentText = styled.div<{ $isExpanded: boolean }>`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  max-height: ${props => props.$isExpanded ? '200px' : '42px'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${props => props.$isExpanded ? '0' : '24px'};
    background: ${props => props.$isExpanded ? 'none' : 'linear-gradient(to bottom, transparent, #F5F5F5)'};
    pointer-events: none;
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #1B3B35;
  font-size: 0.8rem;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.25rem;

  &:hover {
    color: #2a5a50;
  }
`;

interface FormData {
  name: string;
  phone: string;
  email: string;
  position: string;
  years: string;
  city: string;
}

interface ContactFormProps {
  selectedSkills: string[];
  skillsWithOwnWords: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ selectedSkills, skillsWithOwnWords }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    position: '',
    years: '',
    city: ''
  });
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Hide after 5 seconds
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    if (!hasConsent) {
      alert('Моля, съгласете се с условията за обработка на лични данни преди да продължите.');
      return;
    }

    if (selectedSkills.length === 0) {
      showNotification('Моля, изберете поне едно умение', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        age: Number(formData.years),
        skills: selectedSkills.map(skill => ({
          name: skill
        })),
        skillsWithOwnWords
      };

      // const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/candidate/submit`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(submissionData),
      // });
      const response = {
        ok: true,
      };

      if (response.ok) {
        showNotification('Формата е изпратена успешно! Очаквайте да се свържем с Вас.', 'success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          position: '',
          years: '',
          city: ''
        });
        setHasConsent(false);
      } else {
        // const errorData = await response.json();
        // showNotification(errorData.message || 'Възникна грешка при изпращането', 'error');
      }
    } catch (error) {
      showNotification('Възникна грешка при свързването със сървъра', 'error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <FormContainer id="contact-form" className="contact-form">
      {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
          />
        </FormGroup>

        <ConsentContainer>
          <CheckboxContainer onClick={() => setHasConsent(!hasConsent)}>
            <Checkbox 
              type="checkbox" 
              checked={hasConsent}
              onChange={() => setHasConsent(!hasConsent)}
              required
            />
            <ConsentText $isExpanded={isExpanded}>
              Декларирам, че съм съгласен/а личните данни, предоставени от мен на тази платформа, да бъдат обработвани от Mogago като администратор на лични данни, до оттегляне на предоставеното от мен съгласие, с цел профилиране на моите умения и предоставяне на публично достъпна информация за потенциални професионални възможности на потенциални работодатели въз основа на предоставените умения.
            </ConsentText>
          </CheckboxContainer>
          <ExpandButton 
            type="button" 
            onClick={handleExpandClick}
          >
            {isExpanded ? 'Покажи по-малко' : 'Прочети повече'}
          </ExpandButton>
        </ConsentContainer>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Изпращане...' : 'Изпрати'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ContactForm; 