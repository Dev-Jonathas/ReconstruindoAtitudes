import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoggedHeader.css";
import logo from "../../assets/imgs/logo_ra1.png";

const LoggedHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   localStorage.removeItem("token"); // Exemplo de remoção do token
    navigate("/login"); // Redirecionar para a página de login
  };

  // Redireciona para a página de login se o usuário tentar acessar uma página protegida
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <header className="header-container">
      <nav className="logo">
          <img src={logo} alt="RA" />
    

        <ul className="nav-links">
          <li>
            <Link to="/registermentor" className="link">
              Seja um Mentor
            </Link>
          </li>
        </ul>

        <div className="profile-menu">
              <button onClick={handleLogout} className="dropdown-button">
                Sair
              </button>
            </div>
      </nav>
    </header>
  );
};

export default LoggedHeader;
