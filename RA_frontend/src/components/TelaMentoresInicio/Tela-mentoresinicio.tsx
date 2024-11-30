import React from 'react';
import Header from '../../pages/Header/Header';
import Mentorinicio from '../../pages/Tela-mentoresInicio/Mentoresinicio';
import Footer from '../../pages/Footer/Footer';

const MentorPage: React.FC = () => {
  return (
    <div className="mentor-page">
      <Header />
      <Mentorinicio />
      <Footer />
    </div>
  );
}

export default MentorPage;
