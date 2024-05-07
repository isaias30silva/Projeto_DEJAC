// Home.js

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ImageComponent from "./ImageComponent";
import Rodape from "./Rodape";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 40px;
`;

const Emoji = styled.span`
  font-size: inherit;
  margin-right: 10px; 
`;

const GreenText = styled.span`
  color: #3CB371;
  font-size: 25px;
`;

const Title2 = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Title3 = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

const InstructionText = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 0 10px;
    border: 1px solid #3CB371;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 0 10px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #3CB371;
    background-color: #98FB98;
    color: black;
    font-weight: bold;
    font-size: 16px;
    height: 40px;
    margin-bottom: 20px;

    /* Efeito hover */
    &:hover {
        font-size: 14px;
        color: white;
        background-color: black;
    }
`;

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserAccess = () => {
    navigate("/usuario");
  };

  const handleAdminAccess = () => {
    setShowLogin(true);
  };

  const handleLogin = () => {
    // Verificar se o login e a senha estão corretos
    if (username === "admin" && password === "admin") {
      navigate("/administrador");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <Container>
        <Title>Olá!
      <Emoji role="img" aria-label="Olá">👋</Emoji>
    </Title>
      <Title2>Seja bem-vindo(a) ao portal <GreenText>DEJAC</GreenText> - Descarte de Eletrônicos em Jacareí</Title2>
      <Title3>Escolha abaixo o modo de acesso</Title3>
      {showLogin ? (
        <>
          <InstructionText>Para acessar como administrador, por favor, informe o usuário e senha</InstructionText>
          <div>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </>
      ) : (
        <>
          <Button onClick={handleUserAccess}>Acessar como usuário</Button>
          <Button onClick={handleAdminAccess}>Acessar como administrador</Button>
        </>
      )}
       <ImageComponent />
       <Rodape />
    </Container>
  );
};

export default HomePage;
