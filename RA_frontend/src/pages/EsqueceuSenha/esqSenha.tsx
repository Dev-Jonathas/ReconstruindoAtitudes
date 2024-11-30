import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação após alterar a senha
import "./esqueceuSenha.css";

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpar mensagens anteriores
    setErrorMessage("");
    setSuccessMessage("");

    // Validação de campos
    if (!email || !newPassword || !confirmPassword) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/EsqueceuSenha", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          senha: newPassword,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Senha alterada com sucesso!");
        setTimeout(() => {
          navigate("/login", { state: { message: "Senha alterada com sucesso!" } });
        }, 2000);
      } else if (response.status === 404) {
        setErrorMessage("Usuário com este e-mail não foi encontrado.");
      } else {
        setErrorMessage("Erro ao alterar a senha. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErrorMessage("Erro de conexão com o servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="e-background">
      <div className="e-container">
        <h2>Alterar Senha</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleChangePassword}>
          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Alterar Senha</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
