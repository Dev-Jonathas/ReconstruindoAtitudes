import React from 'react';
import Header from '../../pages/Header/Header';
import Main from '../../pages/Main/Main';
import Footer from '../../pages/Footer/Footer';


const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default HomePage;
