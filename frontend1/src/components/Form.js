import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    width: 100vw;
    margin-left: 20px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: ${({ name }) => (name === "nome" ? "280px" : name === "endereco" ? "520px" : name === "email" ? "280px" : name === "fone" ? "100px" : "200px")};
    padding: 0 10px;
    border: 1px solid #3CB371;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #3CB371;
    background-color: #98FB98;
    color: black;
    font-weight: bold;
    height: 42px;

    /* Efeito hover */
    &:hover {
        font-size: 14px;
        color: white;
        background-color: black;
    }
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.endereco.value = onEdit.endereco;
            user.fone.value = onEdit.fone;
            user.email.value = onEdit.email;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.endereco.value ||
            !user.fone.value ||
            !user.email.value
        ) {
            return toast.warn("Preencha todos os campos");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    nome: user.nome.value,
                    endereco: user.endereco.value,
                    fone: user.fone.value,
                    email: user.email.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios 
                .post("http://localhost:8800", {
                    nome: user.nome.value,
                    endereco: user.endereco.value,
                    fone: user.fone.value,
                    email: user.email.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.nome.value = "";
        user.endereco.value= "";
        user.fone.value="";
        user.email.value="";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Endereço</Label>
                <Input name="endereco" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>
            <InputArea>
                <Label>Email/Site/Rede Social</Label>
                <Input name="email" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
