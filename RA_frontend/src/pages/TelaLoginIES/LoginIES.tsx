import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const TelaLoginIES: React.FC = () => {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://rabackend-production-0e39.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cnpj, senha }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);
        navigate("/IES");
      } else {
        const text = await response.text();
        setError(text || "Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      setError("Ocorreu um erro, por favor, tente novamente.");
    }
  };

  return (
    <div className="login-page">
      <div className="cadastro-container">
        <h1 className="h1Cadastro"> Login </h1>
        <p>Novo nesse site?</p>
        <a className="reg" href="/CadastroIES">
          Registra-se
        </a>

        <form onSubmit={handleLogin}>
          <label>
            CNPJ:
            <input
              type="text"
              placeholder="CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <a className="E-senha" href="//">
            Esqueci minha senha?
          </a>
          
          {error && <div className="error">{error}</div>}
          <button type="submit" className="BLogin">
            Fazer Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default TelaLoginIES;
