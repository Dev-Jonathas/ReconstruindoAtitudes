import React, { useState } from "react";
import "../TelaLoginIES/Login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };

    return (
      <div className="login-page ">
        <div className="cadastro-container">
          <h1 className="h1Cadastro"> Login </h1>
          <p>Novo nesse site?</p> 
          <a className="reg" href="/Cadastro">Registra-se</a>
          <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
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
            <a className="E-senha" href="//">Esqueci minha senha?</a>
            <br />

            <a className="telas" href="/loginIES">Login IES</a>
            <a className="telas" href="//">Login Mentor</a>

            <button type="submit" className="BLogin">Fazer Login</button>

          </form>
        </div>
      </div>
    );
};

export default Login;
