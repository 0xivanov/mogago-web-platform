import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './components/FormPage';
import ConfirmationPage from './components/ConfirmationPage';
import BusinessRegister from './components/BusinessRegister';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        {/* <Route path="/business/register" element={<BusinessRegister />} /> */}
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
