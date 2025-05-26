import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #FFF4E5;
  padding: 3rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  min-height: 60vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1B3B35;
`;

const Card = styled.div`
  background-color: #E6D9F6;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  h2 {
    color: #1B3B35;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
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

const TextArea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  min-height: 150px;
  resize: vertical;
  
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

const ActionButton = styled(Button)`
  padding: 0.6rem 1rem;
  font-size: 1rem;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #dc3545;
  
  &:hover {
    background-color: #c82333;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: rgba(27, 59, 53, 0.1);
  color: #1B3B35;
  font-weight: 600;
  
  &:first-child {
    border-top-left-radius: 8px;
  }
  
  &:last-child {
    border-top-right-radius: 8px;
  }
`;

const Td = styled.td<{ 'data-last-row'?: boolean }>`
  padding: 1rem;
  border-bottom: 1px solid rgba(27, 59, 53, 0.1);
  color: #1B3B35;

  &:first-child {
    border-bottom-left-radius: ${props => props['data-last-row'] ? '8px' : '0'};
  }
  
  &:last-child {
    border-bottom-right-radius: ${props => props['data-last-row'] ? '8px' : '0'};
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

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

interface JobVacancy {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
}

const BusinessDashboard: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: ''
  });
  const [jobVacancies, setJobVacancies] = useState<JobVacancy[]>([]);
  const [editingVacancy, setEditingVacancy] = useState<JobVacancy | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchJobVacancies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/business/job-vacancies`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('businessToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJobVacancies(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Неуспешно получаване на обяви за работа');
      }
    } catch (err) {
      setError('Възникна грешка при получаване на обяви за работа');
    }
  };

  useEffect(() => {
    fetchJobVacancies();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editingVacancy) {
      setEditingVacancy({ ...editingVacancy, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    const data = editingVacancy || formData;

    // Enhanced validation for all fields
    if (!data.title || !data.description || !data.requirements || !data.location || !data.salary) {
      setError('Моля, попълнете всички полета');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingVacancy 
        ? `${process.env.REACT_APP_SERVER_URL}/business/job-vacancy/${editingVacancy.id}`
        : `${process.env.REACT_APP_SERVER_URL}/business/create-job-vacancy`;

      const response = await fetch(url, {
        method: editingVacancy ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('businessToken')}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(editingVacancy ? 'Обявата е обновена успешно' : 'Обявата е създадена успешно');
        setFormData({
          title: '',
          description: '',
          requirements: '',
          location: '',
          salary: ''
        });
        setEditingVacancy(null);
        fetchJobVacancies();
      } else {
        const errorData = await response.json();
        setError(errorData.error || `Неуспешно ${editingVacancy ? 'обновяване' : 'създаване'} на обявата`);
      }
    } catch (err) {
      setError('Възникна грешка. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (vacancy: JobVacancy) => {
    setEditingVacancy(vacancy);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Сигурни ли сте, че искате да изтриете тази обява?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/business/job-vacancy/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('businessToken')}`
        }
      });

      if (response.ok) {
        setSuccess('Обявата е изтрита успешно');
        fetchJobVacancies();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Неуспешно изтриване на обявата');
      }
    } catch (err) {
      setError('Възникна грешка при изтриването на обявата');
    }
  };

  const handleCancel = () => {
    setEditingVacancy(null);
    setError('');
    setSuccess('');
  };

  return (
    <PageWrapper>
      <Container>
        <Title>Табло за управление на бизнес профил</Title>
        
        <Card>
          <h2>{editingVacancy ? 'Редактиране на обява' : 'Създаване на нова обява'}</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Заглавие на позицията*</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={editingVacancy?.title || formData.title}
                onChange={handleChange}
                placeholder="Въведете заглавие на позицията"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Описание на позицията*</Label>
              <TextArea
                id="description"
                name="description"
                value={editingVacancy?.description || formData.description}
                onChange={handleChange}
                placeholder="Въведете подробно описание на позицията"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="requirements">Изисквания*</Label>
              <TextArea
                id="requirements"
                name="requirements"
                value={editingVacancy?.requirements || formData.requirements}
                onChange={handleChange}
                placeholder="Въведете изисквания за позицията"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="location">Локация*</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={editingVacancy?.location || formData.location}
                onChange={handleChange}
                placeholder="Въведете локация"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="salary">Възнаграждение*</Label>
              <Input
                type="text"
                id="salary"
                name="salary"
                value={editingVacancy?.salary || formData.salary}
                onChange={handleChange}
                placeholder="Въведете възнаграждение"
                required
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? (editingVacancy ? 'Обновяване...' : 'Създаване...') 
                  : (editingVacancy ? 'Обнови обявата' : 'Създай обява')}
              </Button>
              {editingVacancy && (
                <Button type="button" onClick={handleCancel}>
                  Отказ
                </Button>
              )}
            </div>
          </Form>
        </Card>

        <Card>
          <h2>Вашите обяви за работа</h2>
          <Table>
            <thead>
              <tr>
                <Th>Заглавие</Th>
                <Th>Локация</Th>
                <Th>Възнаграждение</Th>
                <Th>Действия</Th>
              </tr>
            </thead>
            <tbody>
              {jobVacancies.map((vacancy, index) => (
                <tr key={vacancy.id}>
                  <Td data-last-row={index === jobVacancies.length - 1}>{vacancy.title}</Td>
                  <Td data-last-row={index === jobVacancies.length - 1}>{vacancy.location}</Td>
                  <Td data-last-row={index === jobVacancies.length - 1}>{vacancy.salary}</Td>
                  <Td data-last-row={index === jobVacancies.length - 1}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <ActionButton type="button" onClick={() => handleEdit(vacancy)}>
                        Редактирай
                      </ActionButton>
                      <DeleteButton type="button" onClick={() => handleDelete(vacancy.id)}>
                        Изтрий
                      </DeleteButton>
                    </div>
                  </Td>
                </tr>
              ))}
              {jobVacancies.length === 0 && (
                <tr>
                  <Td colSpan={4} style={{ textAlign: 'center' }} data-last-row={true}>
                    Няма намерени обяви
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </PageWrapper>
  );
};

export default BusinessDashboard; 