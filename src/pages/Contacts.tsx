import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const ContactsWrapper = styled.div`
  background-color: #FFF4E5;
  padding: 3rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  min-height: 60vh;
  display: flex;
  justify-content: center;
`;

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  max-width: 1100px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactCard = styled.div`
  flex: 1;
  background-color: #E6D9F6;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ContactFormWrapper = styled.form`
  flex: 1;
  background-color: #E6D9F6; /* Lavender like the contact card */
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;


const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1B3B35;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const ContactInfo = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
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
  transition: all 0.2s ease; /* smooth transition */

  &:hover {
    background-color: #16302b;
    transform: translateY(-3px); /* ⬆️ goes up on hover */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* optional lift shadow */
  }
`;

const ContactItem = styled.li`
  background-color: #f2f0fa; /* Pale lavender */
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1B3B35;
  flex-wrap: wrap;

  a {
    color: #1B3B35;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.6rem 1rem;
  }
`;

const ConfirmationMessage = styled.div`
  background-color: #dff0d8;
  color: #2b542c;
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;


const Contacts: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    emailjs.send(
      'service_ijlpij3',
      'template_sbia0li',
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      'eRM7zJVwA7NRr_FHv'
    ).then(() => {
      setSent(true); // ✅ show confirmation
      setForm({ name: '', email: '', message: '' });
    
      setTimeout(() => setSent(false), 4000); // hide after 4 seconds
    }).catch((error: any) => {
      console.error('EmailJS Error:', error);
      alert('Възникна грешка при изпращането. Моля, опитайте отново.');
    });
  };

  return (
    <ContactsWrapper>
      <ContactsContainer>
        <ContactCard>
          <Title>Контакти</Title>
          <Description>Можете да се свържете с нас чрез:</Description>
          <hr style={{ border: 'none', borderTop: '1px solid #ccc', marginBottom: '1.5rem' }} />

        <ContactInfo>
          <ContactItem>
            <span role="img" aria-label="email">📧</span>
            <a href="mailto:info@mogago.bg">info@mogago.bg</a>
          </ContactItem>
          <ContactItem>
            <span role="img" aria-label="phone">📞</span>
            <a href="tel:+359882725332">+359 882 725 332</a>
          </ContactItem>
          <ContactItem>
            <span role="img" aria-label="phone">📞</span>
            <a href="tel:+359896436422">+359 896 436 422</a>
          </ContactItem>
        </ContactInfo>
        </ContactCard>

        <ContactFormWrapper onSubmit={handleSubmit}>
          {sent && (
            <ConfirmationMessage>
              ✅ Съобщението беше изпратено успешно!
            </ConfirmationMessage>
          )}

          <Title>Изпратете ни съобщение</Title>
          <Input
            name="name"
            type="text"
            placeholder="Вашето име"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Вашият имейл"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Вашето съобщение"
            value={form.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">Изпрати</Button>
        </ContactFormWrapper>
      </ContactsContainer>
    </ContactsWrapper>
  );
};

export default Contacts;
