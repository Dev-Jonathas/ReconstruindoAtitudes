import React from 'react';
import Header from '../../pages/Header/Header';
import AgendarMentor from '../../pages/AgendarMentor/AgendarMentor';
import Footer from '../../pages/Footer/Footer';

const MentorPage: React.FC = () => {
  return (
    <div className="mentor-page">
      <Header />
      <AgendarMentor />
      <Footer />
    </div>
  );
}

export default MentorPage;
