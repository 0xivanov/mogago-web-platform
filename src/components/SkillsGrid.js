import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;  
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CategoryColumn = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: ${props => (props.reverse ? 'flex-end' : 'flex-start')};
`;

const CategoryLabel = styled.div`
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  padding: 10px;
  text-align: center;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => (props.reverse ? '0 0 0 5px' : '0 5px 0 0')};
`;

const SkillsColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 10px 0;
`;

const SkillButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #000;
  background-color: ${props => props.selected ? '#f9c846' : 'white'};
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${props => props.selected ? '#f9c846' : '#f5f5f5'};
  }
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  font-weight: bold;
`;

function SkillsGrid({ selectedSkills, onSkillToggle }) {
  const categories = [
    {
      name: 'Дърво и метал',
      skills: [
        'Дърворезба',
        'Ковачество(металообработка)',
        'Изработка на мебели',
        'Изработване на ножове',
        'Пирография(горене върху дърво)'
      ]
    },
    {
      name: 'Текстил',
      skills: [
        'Тъкачество',
        'Килимарство',
        'Плетиво и плетене на една кука',
        'Рисуване върху коприна',
        'Тъкане на дантели',
        'Шев и кройка(шиене на дрехи)',
        'Работa с макраме'
      ]
    },
    {
      name: 'Керамика и стъкло',
      skills: [
        'Грънчарство(керамика)',
        'Стъклопис и витражи',
        'Ваяне(скулптура)'
      ]
    },
    {
      name: 'Изкуства',
      skills: [
        'Изработка на бижута',
        'Иконопис',
        'Реставрация на антики',
        'Декупаж'
      ]
    },
    {
      name: 'Природни материали',
      skills: [
        'Кожарство',
        'Плетене на кошници',
        'Книговезане',
        'Пчеларство(восък и пчелни продукти)'
      ]
    },
    {
      name: 'Домашни занаяти',
      skills: [
        'Изработка на свещи',
        'Изработка на сапуни и козметика'
      ]
    }
  ];

  return (
    <GridContainer>
      <CategoriesWrapper>
        {categories.map((category, categoryIndex) => (
          <CategoryColumn key={categoryIndex} reverse={categoryIndex < categories.length / 2}>
            {categoryIndex >= categories.length / 2 && (
              <CategoryLabel>{category.name}</CategoryLabel>
            )}
            <SkillsColumn>
              {category.skills.map((skill, skillIndex) => (
                <SkillButton
                  key={`${categoryIndex}-${skillIndex}`}
                  selected={selectedSkills?.includes(`${category.name}-${skill}`)}
                  onClick={() => onSkillToggle(`${category.name}-${skill}`)}
                >
                  {skill}
                </SkillButton>
              ))}
            </SkillsColumn>
            {categoryIndex < categories.length / 2 && (
              <CategoryLabel reverse>{category.name}</CategoryLabel>
            )}
          </CategoryColumn>
        ))}
      </CategoriesWrapper>
      <Title>БРОЙ ОБЯВИ</Title>
    </GridContainer>
  );
}

export default SkillsGrid;