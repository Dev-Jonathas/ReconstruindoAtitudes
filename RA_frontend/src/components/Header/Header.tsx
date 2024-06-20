import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/logo_ra1.png';
import './Header.css';



const Header: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Animar a rolagem
    });
  };


  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="RA" />
          </Link>
        </div>
        <nav className="menu">
          <ul>
            <li><Link to="/" className='link' onClick={scrollToTop}>Início</Link></li>
            <li><Link to="/mentor" className='link'>Mentores</Link></li>
            <li><Link to="/login" className='link'>Fazer Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
