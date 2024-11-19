import React from 'react';
import styled from 'styled-components';

const ConfirmationContainer = styled.div`
  background-color: #1d1d1d;
  color: #f9f9f9;
  text-align: center;
  padding: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.h2`
  color: #ff5533;
  font-size: 2rem;
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #f9c846;
`;

function ConfirmationPage() {
  return (
    <ConfirmationContainer>
      <Message>Congratulations!</Message>
      <Description>You've just taken the first step toward your new calling! We will contact you as soon as possible.</Description>
    </ConfirmationContainer>
  );
}

export default ConfirmationPage;
