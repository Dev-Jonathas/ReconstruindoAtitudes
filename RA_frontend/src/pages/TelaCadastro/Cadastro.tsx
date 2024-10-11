import React, { useState } from "react";
import "../TelaLoginIES/Login.css";

const Login = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
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
        <a className="reg" href="/login">
          Login
        </a>

        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
          <label>
            Nome:
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label>
            Data nascimento:
            <input
              type="date"
              placeholder="Data de nascimento"
              value={data}
              onChange={(e) => setData(e.target.value)}
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
