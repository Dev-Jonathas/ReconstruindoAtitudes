import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/HomePage';
import MentorPage from './pages/AgendarMentor/AgendarMentor';
import AnamnesePage from './pages/Anamnese/AnamnesePage';
import AgendamentoPage from './pages/Agendamento/AgendamentoPage';
import LoginPage from './pages/TelaLogin/Login';
import IESPage from './pages/TelaIES/TelaIES';




const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/anamnese" element={<AnamnesePage />} />
        <Route path="/agendamento" element={<AgendamentoPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/IES" element={<IESPage/>} />
      </Routes>
    </Router>
  );
}
export default App;
