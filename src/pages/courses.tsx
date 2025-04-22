import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #FFF4E5;
  padding: 4rem 1.5rem;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageCard = styled.div`
  background: linear-gradient(to bottom, #E6D9F6 0%, #ffffff 40%);
  border-radius: 20px;
  padding: 4rem 2rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1B3B35;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #333;
  line-height: 1.6;
`;

const Courses: React.FC = () => {
  return (
    <PageWrapper>
      <MessageCard>
        <Title>Обучения</Title>
        <Subtitle>Тази секция е в процес на изграждане.</Subtitle>
        <Subtitle>Очаквайте скоро повече информация за партньорства и курсове!</Subtitle>
      </MessageCard>
    </PageWrapper>
  );
};

export default Courses;
