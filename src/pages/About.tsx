import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #FFF4E5;
  padding: 4rem 1.5rem;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  position: relative;
  max-width: 1000px;
  width: 100%;
  border-radius: 20px;
`;

const Card = styled.div`
  background: linear-gradient(to bottom, #E6D9F6 0%, #ffffff 40%);
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 1000px;
  width: 100%;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #1B3B35;
  margin-bottom: 0.5rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    margin: 0.5rem auto 2rem;
    width: 60px;
    height: 4px;
    background-color: #E6D9F6;
    border-radius: 2px;
  }
`;


const Description = styled.p`
  font-size: 1.2rem;
  color: #333;
  line-height: 1.7;
  margin-bottom: 3rem;
  text-align: center;
`;

const CreatorsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const CreatorCard = styled.div`
  background-color: #CED1C9;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const PlaceholderImage = styled.div`
  background-color: #CED1C9;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
`;

const TextContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const Name = styled.h3`
  color: #1B3B35;
  font-size: 1.1rem;
`;

const About: React.FC = () => {  
  return (
    <PageWrapper>
      <CardWrapper>
        <Card>
          <Title>За Нас</Title>
          <Description>
            <TextContainer>
              В   свят, в който гласовете на „големите“ често заглушават талантите на „невидимите“, <strong>Moga.go</strong> е глас за хората с умения, способности и душа.

              <br /><br />

              Толкова много хора днес носят в себе си невероятни дарби – да създават, да поправят, да отглеждат, да обучават, да се грижат, да вдъхновяват. Те имат знания, придобити с години опит, живот, традиции и битка. Но същите тези хора често живеят с мисълта, че техните умения не са „достатъчно добри“, че не са „истинска професия“ или че просто няма кой да ги забележи.

              <br /><br />

              <strong>Тук грешат.</strong>

              <br /><br />

              Истината е, че техните умения са точно това, което хиляди работодатели търсят – истински, практични, човешки. Но липсва връзката. Липсва мостът. И ние сме тук, за да го изградим.

              <br /><br />

              <strong>Moga.go</strong> е не просто платформа – тя е покана към хората да повярват в себе си, да осъзнаят своята стойност и да я покажат. Покана към работодателите да отворят вратите си и сърцата си за потенциала, който не винаги идва с лъскаво CV, но винаги идва с искреност и желание за работа.

              <br /><br />

              Представете си баба, която цял живот е отглеждала градина, но никога не си е представяла, че това е „умение“. Мъж, който знае как се прави всичко вкъщи, но не знае как да го превърне в професия. Момиче, което шие със страст, но смята, че това е просто хоби. Те всички могат да бъдат бъдещите експерти, от които бизнесът има нужда.

              <br /><br />

              Вярваме, че е време за нов начин на мислене. Ново разбиране за стойността на човека. И време за истинска подкрепа.

              <br /><br />

              <div style={{ textAlign: 'center' }}>
                <ul style={{
                  display: 'inline-block',
                  textAlign: 'left',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                  color: '#1B3B35',
                  paddingLeft: '1rem',
                  marginTop: '1rem',
                  marginBottom: '2rem'
                }}>
                  <li>✅ Всеки човек има талант, дори когато самият той не го осъзнава.</li>
                  <li>✅ Уменията, придобити чрез живот, са също толкова важни, колкото и дипломите.</li>
                  <li>✅ Работата с душа винаги е по-ценна от автоматичната.</li>
                <li>✅ Компаниите, които отварят врати към истинския потенциал, създават бъдеще.</li>
                  <li>✅ Когато вярваме един в друг, изграждаме общество, което не оставя никого назад.</li>
                </ul>
              </div>

              <br />

              <strong>Ние сме тук</strong> – за онези, които се съмняват, че са нужни. За онези, които искат да започнат отначало. За онези, които вярват, че имат какво да дадат.

              <br /><br />

              Ние вярваме в хората. В техните ръце, в техните сърца, в техните истории.  
              И точно те ще променят света. Сега е моментът да им подадем ръка.

              <br /><br />

              <em>Защото всеки може. И всеки заслужава да има своя шанс.</em>
            </TextContainer>
          </Description>
        </Card>
      </CardWrapper>
    </PageWrapper>
  );
};


export default About;
