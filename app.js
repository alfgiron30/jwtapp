const express = require("express");
const jwt = require("jsonwebtoken");
const findUserByUsername = require("./users");
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const secretKey = process.env.SECRET_KEY;

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = findUserByUsername(username);
 
    if (user) {
        try {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ username }, secretKey, { expiresIn: '60s' });
                return res.json({ token });
            } else {//contraseña incorrecta
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
        } catch (error) {
            console.error('Error al comparar contraseñas:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {//user no encontrado
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(" ")[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (error, decoded) => {
        if (error) {
            res.status(401).json({ error: 'Token inválido' });
        } else {
            res.json({ mensaje: "token correcto", usuario: decoded.username });
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor Node.js en ejecución en el puerto 3000...");
});
