const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs/promises');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersFilePath = path.join(__dirname, 'db', 'users.json');

const readUsersFromFile = async () => {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeUsersToFile = async (users) => {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.get('/users', async (req, res) => {
    const users = await readUsersFromFile();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const users = await readUsersFromFile();

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    users.push(newUser);
    await writeUsersToFile(users);
    res.status(201).json(newUser);
});

app.get('/users/:userId', async (req, res) => {
    const users = await readUsersFromFile();

    const user = users.find(user => user.id === Number(req.params.userId));
    res.json(user);
});

app.delete('/users/:userId', async (req, res) => {
    let users = await readUsersFromFile();
    users = users.filter(user => user.id !== Number(req.params.userId));
    await writeUsersToFile(users);
    res.sendStatus(204);
});

app.put('/users/:userId', async (req, res) => {
    const users = await readUsersFromFile();
    const userId = Number(req.params.userId);
    const userIndex = users.findIndex(user => user.id === userId);
    users[userIndex] = {
        id: userId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    await writeUsersToFile(users);
    res.status(200).json(users[userIndex]);
});

app.patch('/users/:userId', async (req, res) => {
    const users = await readUsersFromFile();
    const userId = Number(req.params.userId);
    const userIndex = users.findIndex(user => user.id === userId);
    users[userIndex].name = req.body.name;
    await writeUsersToFile(users);
    res.status(200).json(users[userIndex]);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`)
});