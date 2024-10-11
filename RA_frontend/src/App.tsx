import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/HomePage';
import MentorPage from './components/AgendarMentor/AgendarMentor';
import AnamnesePage from './components/Anamnese/AnamnesePage';
import AgendamentoPage from './components/Agendamento/AgendamentoPage';
import LoginIESPage from './components/TelaLoginIES/Login';
import LoginPage from './components/TelaLogin/Login';
import IESPage from './components/TelaIES/TelaIES';
import CadastroPage from './components/TelaCadastro/Cadastro';
import CadastroIESPage from './components/TelaCadastroIES/CadastroIES';
import UsuarioPage from './components/TelaUsuario/Usuario';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/anamnese" element={<AnamnesePage />} />
        <Route path="/agendamento" element={<AgendamentoPage/>} />
        <Route path="/cadastroIES" element={<CadastroIESPage/>} />
        <Route path="/cadastro" element={<CadastroPage/>} />
        <Route path="/loginIES" element={<LoginIESPage/>} />
        <Route path="login" element={<LoginPage/>} />
      <Route path="/Usuario" element={<UsuarioPage/>} />
        <Route path="/IES" element={<IESPage/>} />
      </Routes>
    </Router>
  );
}
export default App;
