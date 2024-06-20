import React from 'react';
import Header from '../../components/Header/Header';
import AgendarMentor from '../../components/AgendarMentor/AgendarMentor';
import Footer from '../../components/Footer/Footer';

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
