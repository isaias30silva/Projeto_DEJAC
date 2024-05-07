import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    margin: 20px auto;
    word-break: break-all;
    margin-right: 3%;
    margin-top: 0px;
    width: -webkit-fill-available;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    padding-right:20px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit, hideIcons }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
        
        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Endereço</Th>
                    <Th onlyWeb>Telefone</Th>
                    <Th>Email/Site/Rede Social</Th>
                    {hideIcons ? null : <Th></Th>}
                    {hideIcons ? null : <Th></Th>}
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="25%">{item.nome}</Td>
                        <Td width="40%">{item.endereco}</Td>
                        <Td width="12%" onlyWeb>{item.fone}</Td>
                        <Td width="50%">{item.email}</Td>
                        {hideIcons ? null : (
                            <>
                                <Td alignCenter width="5%">
                                    <FaEdit onClick={() => handleEdit(item)} />
                                </Td>
                                <Td alignCenter width="5%">
                                    <FaTrash onClick={() => handleDelete(item.id)} />
                                </Td>
                            </>
                        )}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;