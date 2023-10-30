import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/pub', express.static(path.join(__dirname, 'client', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/users', async (req,res) => {
const data = await fs.readFile('./users.json', 'utf8');
const users = JSON.parse(data).users;
return res.send(users);
});

app.get('/users/:userId', async (req,res) => {
    const data = await fs.readFile('./users.json', 'utf8');
    const {users} = JSON.parse(data);
    const userID = parseInt(req.params.userId);
    const user = users.find(user => userID === user.id);
    user ? res.send(user) : res.status(404).send({state : 'User not found!'});
});


app.listen('3000', (req, res) => {
    console.log(`Open this link in your browser: http://127.0.0.1:3000`);
});