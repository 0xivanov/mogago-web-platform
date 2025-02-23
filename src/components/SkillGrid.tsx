import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const CategorySectionsGrid = styled.div`
  display: block;
  column-count: 1;
  column-gap: 1rem;
  width: 100%;
  
  @media (min-width: 768px) {
    column-count: 2;
  }
  
  @media (min-width: 1024px) {
    column-count: 3;
  }
`;

const CategorySection = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  break-inside: avoid;
  margin-bottom: 1rem;
  scroll-margin-top: 20px;
`;

const textScaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StickyHeader = styled.div<{ bgColor: string; isHighlighted: boolean }>`
  position: sticky;
  top: 0;
  background-color: ${props => props.bgColor};
  padding: 1.5rem 1.5rem 0rem;
  border-radius: 15px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleContainer = styled.div<{ isHighlighted: boolean }>`
  flex: 1;
  transform-origin: left center;
  ${props => props.isHighlighted && css`
    animation: ${textScaleAnimation} 2s ease;
  `}
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #1B3B35;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 0.5rem;
`;

const ScrollButton = styled.button`
  background: none;
  border: none;
  color: #1B3B35;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const CategoryContent = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
`;

const SkillItem = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1.1rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  width: 100%;
  justify-content: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.checked ? '#1B3B35' : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  border: 1px solid ${props => props.checked ? '#1B3B35' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.2s ease;

  &:after {
    content: '×';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 20px;
    line-height: 1;
    opacity: ${props => props.checked ? 1 : 0};
  }

  &:hover {
    background-color: ${props => props.checked ? '#1B3B35' : 'rgba(255, 255, 255, 1)'};
  }
`;

const categories = [
  {
    id: 'house',
    name: 'Къща',
    bgColor: '#FFE4E1',
    skills: [
      'Гипсокартон',
      'ВИК',
      'Готвене',
      'Боядисване',
      'Контакти и Ток',
      'Ремонт на кола',
      'Сглобяване на мебели',
      'Слагане на паркет',
      'Хамалски услуги',
      'Почистване',
      'Плочки',
      'Мозайки',
      'Къртене',
      'Дограма',
      'Ремонт на уреди',
      'Ремонт на покриви',
      'Шпакловане',
      'Работа с инструменти',
      'Климатици',
    ]
  },
  {
    id: 'agriculture',
    name: 'Земеделие',
    bgColor: '#E0EEE0',
    skills: [
      'Пчеларство',
      'Отглеждане на зеленчуци',
      'Гъбарство',
      'Винарство',
      'Разсаждане',
      'Овощни дръвчета',
      'Управление на машини',
      'Гледане на цветя',
      'Пръскане на реколта',
      'Отглеждане на добитък',
      'Приготвяне на зимнина',
      'Изделия от меса',
      'Оранжерия',
      'Оформяне на храсти',
      'Пивоварство'
    ]
  },
  {
    id: 'materials',
    name: 'Материали',
    bgColor: '#F5F5DC',
    skills: [
      'Дървосекачество',
      'Заваряване',
      'Предмети от дърво',
      'Дърворезба',
      'Електротехника',
      'Пирография',
      'Точиларство',
      'Реставриране на мебели',
      'Стругарство',
      'Рисуване',
      'Керамика',
      'Камък',
      'Мрамор',
      'Коване',
      'Железария',
      '3D принтиране',
      'Бижута',
      'Тенекиджия'
    ]
  },
  {
    id: 'textiles',
    name: 'Платове и кожа',
    bgColor: '#F5E6E6',
    skills: [
      'Шиене',
      'Плетене',
      'Работа с кожи',
      'Бродиране',
      'Правене на килими',
      'Плетене',
      'Ъпсаиклинг',
      'Рисуване върху плат',
      'Претапициране',
      'Изработка на аксесоари',
    ]
  },
  {
    id: 'beauty',
    name: 'Красота',
    bgColor: '#E6E6FA',
    skills: [
      'Подстригване',
      'Маникюр',
      'Масажи',
      'Грим',
      'Боя за коса',
      'Перманентен грим',
      'Почистване на кожа',
      'Мигли',
      'Магазин за козметика',
      'Нюх към мода',
      'Производство на сапун',
      'Домашна козметика',
      'Етерични масла',
    ]
  },
  {
    id: 'care',
    name: 'Грижа',
    bgColor: '#FFE4E1',
    skills: [
      'Разхождане на кучета',
      'Домашни любимци',
      'Учител',
      'Детегледачка',
      'Чужди езици',
      'Артистично писане',
      'Шофиране',
      'Рисуване',
      'Акваристика',
      'Хороскоп',
    ]
  }
];

interface SkillGridProps {
  selectedCategory: string | null;
}

const SkillGrid: React.FC<SkillGridProps> = ({ selectedCategory }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const scrollToTop = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <CategorySectionsGrid>
        {categories.map(category => (
          <CategorySection 
            key={category.id} 
            bgColor={category.bgColor}
            id={`category-${category.id}`}
          >
            <StickyHeader 
              bgColor={category.bgColor}
              isHighlighted={selectedCategory === category.id}
            >
              <TitleContainer isHighlighted={selectedCategory === category.id}>
                <CategoryTitle>{category.name}</CategoryTitle>
                <CategoryDescription>
                  Избери от тези умения или добави свое.
                </CategoryDescription>
              </TitleContainer>
              <ScrollButton onClick={() => scrollToTop(category.id)}>
                <i className="fas fa-arrow-up"></i>
              </ScrollButton>
            </StickyHeader>
            <CategoryContent>
              <SkillsList>
                {category.skills.map(skill => (
                  <SkillItem key={skill}>
                    <Checkbox
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    {skill}
                  </SkillItem>
                ))}
              </SkillsList>
            </CategoryContent>
          </CategorySection>
        ))}
      </CategorySectionsGrid>
    </Container>
  );
};

export default SkillGrid; 