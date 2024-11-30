import React from 'react';
import LoggedHeader from '../../pages/LoggedHeader/Header';
import MentorUser from '../../pages/Tela-mentoresUser/MentoresUser';
import Footer from '../../pages/Footer/Footer';

const MentoresPage: React.FC = () => {
  return (
    <div className="mentor-page">
      <LoggedHeader />
      <MentorUser />
      <Footer />
    </div>
  );
}

export default MentoresPage;
