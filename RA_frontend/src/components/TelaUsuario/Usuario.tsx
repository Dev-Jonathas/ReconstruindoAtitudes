import React from "react";

import LoggedHeader from "../../pages/LoggedHeader/Header"; // Header do usuário logado
import Footer from "../../pages/Footer/Footer";
import MainUsuario from "../../pages/MainUsuario/MainUsuario";

const UserPage: React.FC = () => {
  return (
    <div>
      <LoggedHeader /> {/* Header do usuário logado */}
      <MainUsuario />
      <Footer />
    </div>
  );
};

export default UserPage;
