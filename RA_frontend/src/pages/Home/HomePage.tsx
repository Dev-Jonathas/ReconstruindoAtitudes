import React from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';


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
