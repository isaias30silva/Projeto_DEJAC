import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM new_table";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = 
    "INSERT INTO new_table(`nome`, `endereco`, `fone`, `email`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.endereco,
        req.body.fone,
        req.body.email,
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso.");
    });
};

export const updateUser = (req, res) => {
    const q = 
    "UPDATE new_table SET `nome` = ?, `endereco` = ?, `fone` = ?, `email` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.endereco,
        req.body.fone,
        req.body.email,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso.");
    });
};

export const deleteUser = (req, res) => {
    const q = 
    "DELETE FROM new_table WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.");
    });
};