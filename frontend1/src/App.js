import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Rodape from "./components/Rodape";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
    <Container>
      <Title>CADASTRO PONTO DE ENTREGA VOLUNTÁRIA</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <br></br>
      <Title>PONTOS DE ENTREGA VOLUNTÁRIA CADASTRADOS</Title>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
    </Container>
    <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
      <Rodape />
    </>
  );
}

export default App;
