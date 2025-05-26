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

  p {
    color: #1B3B35;
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: #E6D9F6;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.active ? '#1B3B35' : 'transparent'};
  color: ${props => props.active ? 'white' : '#1B3B35'};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#16302b' : 'rgba(27, 59, 53, 0.1)'};
    transform: translateY(-2px);
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

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Skill = styled.span`
  background-color: rgba(27, 59, 53, 0.1);
  color: #1B3B35;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
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

const CodeDisplay = styled.div`
  background-color: rgba(27, 59, 53, 0.05);
  border: 1px solid rgba(27, 59, 53, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  font-family: monospace;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1B3B35;
`;

const CopyButton = styled.button`
  background-color: transparent;
  border: 2px solid #1B3B35;
  color: #1B3B35;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1B3B35;
    color: white;
    transform: translateY(-2px);
  }
`;

interface Candidate {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  age: number;
  currentPosition: string;
  skills: { name: string }[];
  skillsWithOwnWords: string;
}

interface JobVacancy {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  businessId: number;
  createdAt: string;
  updatedAt: string;
}

interface CandidatesBySkills {
  [skill: string]: Candidate[];
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'bySkills' | 'codes' | 'vacancies'>('all');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatesBySkills, setCandidatesBySkills] = useState<CandidatesBySkills>({});
  const [jobVacancies, setJobVacancies] = useState<JobVacancy[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/candidates`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch candidates');
      }
    } catch (err) {
      setError('An error occurred while fetching candidates');
    }
  };

  const fetchCandidatesBySkills = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/candidates-by-skills`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCandidatesBySkills(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch candidates by skills');
      }
    } catch (err) {
      setError('An error occurred while fetching candidates by skills');
    }
  };

  const fetchJobVacancies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/job-vacancies`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data[2])
        setJobVacancies(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch job vacancies');
      }
    } catch (err) {
      setError('An error occurred while fetching job vacancies');
    }
  };

  const generateActivationCode = async () => {
    setIsGenerating(true);
    setError('');
    setSuccess('');
    setGeneratedCode('');

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/generate-activation-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedCode(data.code);
        setSuccess('Кодът за активация е генериран успешно');
      } else {
        setError(data.error || 'Неуспешно генериране на код за активация');
      }
    } catch (err) {
      setError('Възникна грешка при генериране на код за активация');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('Кодът е копиран в клипборда');
    } catch (err) {
      setError('Неуспешно копиране на кода');
    }
  };

  useEffect(() => {
    if (activeTab === 'all') {
      fetchCandidates();
    } else if (activeTab === 'bySkills') {
      fetchCandidatesBySkills();
    } else if (activeTab === 'vacancies') {
      fetchJobVacancies();
    }
  }, [activeTab]);

  const renderAllCandidates = () => (
    <Card>
      <h2>Всички кандидати</h2>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Location</Th>
            <Th>Current Position</Th>
            <Th>Skills</Th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <Td data-last-row={index === candidates.length - 1}>{candidate.name}</Td>
              <Td data-last-row={index === candidates.length - 1}>
                {candidate.email}<br />
                {candidate.phone}
              </Td>
              <Td data-last-row={index === candidates.length - 1}>{candidate.city}</Td>
              <Td data-last-row={index === candidates.length - 1}>{candidate.currentPosition}</Td>
              <Td data-last-row={index === candidates.length - 1}>
                <SkillsContainer>
                  {candidate.skills.map(skill => (
                    <Skill key={skill.name}>{skill.name}</Skill>
                  ))}
                </SkillsContainer>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );

  const renderCandidatesBySkills = () => (
    <>
      {Object.entries(candidatesBySkills).map(([skill, candidates]) => (
        <Card key={skill}>
          <h2>{skill}</h2>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Location</Th>
                <Th>Current Position</Th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={candidate.id}>
                  <Td data-last-row={index === candidates.length - 1}>{candidate.name}</Td>
                  <Td data-last-row={index === candidates.length - 1}>
                    {candidate.email}<br />
                    {candidate.phone}
                  </Td>
                  <Td data-last-row={index === candidates.length - 1}>{candidate.city}</Td>
                  <Td data-last-row={index === candidates.length - 1}>{candidate.currentPosition}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      ))}
    </>
  );

  const renderActivationCodes = () => (
    <Card>
      <h2>Генериране на код за активация</h2>
      <p>Генерирайте код за активация, който да предоставите на бизнес потребител за регистрация.</p>
      
      <Button 
        onClick={generateActivationCode} 
        disabled={isGenerating}
      >
        {isGenerating ? 'Генериране...' : 'Генерирай нов код'}
      </Button>

      {generatedCode && (
        <CodeDisplay>
          <span>{generatedCode}</span>
          <CopyButton onClick={() => copyToClipboard(generatedCode)}>
            Копирай
          </CopyButton>
        </CodeDisplay>
      )}
    </Card>
  );

  const renderJobVacancies = () => (
    <Card>
      <h2>Всички обяви за работа</h2>
      <Table>
        <thead>
          <tr>
            <Th>Заглавие</Th>
            <Th>Локация</Th>
            <Th>Възнаграждение</Th>
            <Th>Изисквания</Th>
            <Th>Създадена на</Th>
          </tr>
        </thead>
        <tbody>
          {jobVacancies.map((vacancy, index) => (
            <tr key={vacancy.id}>
              <Td data-last-row={index === jobVacancies.length - 1}>{vacancy.title}</Td>
              <Td data-last-row={index === jobVacancies.length - 1}>{vacancy.location}</Td>
              <Td data-last-row={index === jobVacancies.length - 1}>{vacancy.salary}</Td>
              <Td data-last-row={index === jobVacancies.length - 1}>{vacancy.requirements}</Td>
              <Td data-last-row={index === jobVacancies.length - 1}>
                {new Date(vacancy.createdAt).toLocaleDateString('bg-BG')}
              </Td>
            </tr>
          ))}
          {jobVacancies.length === 0 && (
            <tr>
              <Td colSpan={5} style={{ textAlign: 'center' }} data-last-row={true}>
                Няма намерени обяви
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );

  return (
    <PageWrapper>
      <Container>
        <Title>Административно табло</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <TabContainer>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            Всички кандидати
          </Tab>
          <Tab 
            active={activeTab === 'bySkills'} 
            onClick={() => setActiveTab('bySkills')}
          >
            Кандидати по умения
          </Tab>
          <Tab 
            active={activeTab === 'codes'} 
            onClick={() => setActiveTab('codes')}
          >
            Кодове за активация
          </Tab>
          <Tab 
            active={activeTab === 'vacancies'} 
            onClick={() => setActiveTab('vacancies')}
          >
            Обяви за работа
          </Tab>
        </TabContainer>

        {activeTab === 'all' && renderAllCandidates()}
        {activeTab === 'bySkills' && renderCandidatesBySkills()}
        {activeTab === 'codes' && renderActivationCodes()}
        {activeTab === 'vacancies' && renderJobVacancies()}
      </Container>
    </PageWrapper>
  );
};

export default AdminDashboard; 