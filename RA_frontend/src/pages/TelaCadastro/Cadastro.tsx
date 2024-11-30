import React, { useState, useEffect } from "react";
import "../TelaLogin/Login.css";
import { Link, useNavigate } from "react-router-dom";

interface IES {
  IesId: number;
  nome: string;
  cnpj: string;
  email: string;
}

const Register = () => {
  const [tipoUsuario, setTipoUsuario] = useState("comum");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeIes, setNomeIes] = useState("");
  const [iesList, setIesList] = useState<IES[]>([]);
  const [selectedIes, setSelectedIes] = useState<number | string>(""); // Alterado para armazenar o ID da IES
  const navigate = useNavigate();

  useEffect(() => {
    if (tipoUsuario === "comum") {
      // Carregar a lista de IES cadastradas para o tipo de usuário comum
      fetch("http://localhost:8080/instituicao/listar") // A API que retorna a lista de IES cadastradas
        .then((response) => response.json())
        .then((data) => setIesList(data))
        .catch((error) => console.error("Erro ao carregar IES", error));
    }
  }, [tipoUsuario]);

  const validarCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj === "") return false;
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Ajustando o formato do JSON com base no tipo de usuário
    const userData =
      tipoUsuario === "comum"
        ? {
            nome,
            dataNascimento,
            email,
            senha,
            instituicaoId: selectedIes, // Agora enviando o ID da IES selecionada
          }
        : {
            nomeIes,
            cnpj,
            email,
            senha,
          };

    const apiRoute =
      tipoUsuario === "comum"
        ? "http://localhost:8080/mentorado/cadastro" // API para cadastro de usuário comum
        : "http://localhost:8080/instituicao/cadastro"; // API para cadastro de IES

    try {
      const response = await fetch(apiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Enviando os dados ajustados no formato correto
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        throw new Error("Erro ao cadastrar!");
      }
    } catch (error) {
      alert("Houve um problema ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <div className="login-page">
      <div className="cadastro-container">
        <h1 className="h1Cadastro">Registra-se</h1>
        <p>Já é membro?</p>
        <Link className="reg" to="/login">
          Login
        </Link>

        <form onSubmit={handleRegister} style={{ marginTop: "20px" }}>
          <label>
            Tipo de Cadastro:
            <select
              className="select"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            >
              <option value="comum">Usuário Comum</option>
              <option value="ies">IES</option>
            </select>
          </label>

          {tipoUsuario === "comum" && (
            <>
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
                Data de Nascimento:
                <input
                  type="date"
                  placeholder="Data de nascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </label>

              <label>
                E-mail:
                <input
                  type="email"
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

              <label>
                Confirmar Senha:
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </label>

              <label>
                Selecione a IES:
                <select
                  value={selectedIes}
                  onChange={(e) => setSelectedIes(e.target.value)}
                  disabled={!iesList.length}
                >
                  <option value="">Selecione uma IES</option>
                  {iesList.map((ies) => (
                    <option key={ies.IesId} value={ies.IesId}>
                      {ies.nome}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {tipoUsuario === "ies" && (
            <>
              <label>
                Nome da IES:
                <input
                  type="text"
                  placeholder="Nome da IES"
                  value={nomeIes}
                  onChange={(e) => setNomeIes(e.target.value)}
                />
              </label>

              <label>
                CNPJ:
                <input
                  type="text"
                  placeholder="CNPJ"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  onBlur={() => {
                    if (!validarCNPJ(cnpj)) {
                      setCnpj("");
                    }
                  }}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  placeholder="Email da IES"
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

              <label>
                Confirmar Senha:
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </label>
            </>
          )}

          <button type="submit" className="BLogin">
            Registra-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
