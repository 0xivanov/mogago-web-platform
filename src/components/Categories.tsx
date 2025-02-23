import React from 'react';
import styled from 'styled-components';

const CategoriesContainer = styled.div`
  padding: 1rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
  scroll-margin-top: 100px;
  background-color: #F5F2ED;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: normal;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryButton = styled.button<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  min-width: 120px;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const categories = [
  { id: 'house', name: 'Къща', bgColor: '#f49c6c' },
  { id: 'agriculture', name: 'Земеделие', bgColor: '#1B3B35' },
  { id: 'materials', name: 'Материал', bgColor: '#D4C5B9' },
  { id: 'textiles', name: 'Платове', bgColor: '#D4C5B9' },
  { id: 'beauty', name: 'Красота', bgColor: '#c4bcf0' },
  { id: 'care', name: 'Грижа', bgColor: '#f49c6c' }
];

interface CategoriesProps {
  onCategorySelect?: (categoryId: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    onCategorySelect?.(categoryId);
  };

  return (
    <CategoriesContainer className="categories-section">
      <Title>Категории:</Title>
      <CategoryGrid>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            bgColor={category.bgColor}
            onClick={() => scrollToCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryGrid>
    </CategoriesContainer>
  );
};

export default Categories; 