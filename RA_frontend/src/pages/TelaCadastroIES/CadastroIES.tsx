import React, { useState } from "react";
import "../TelaLoginIES/Login.css";

const Login = () => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="login-page ">
      <div className="cadastro-container">
        <h1 className="h1Cadastro"> Registra-se </h1>
        <p>Já é membro?</p>
        <a className="reg" href="/loginIES">
          Login
        </a>

        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
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
            Nome da IES:
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label>
            Email:
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className="BLogin">
            Registra-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
