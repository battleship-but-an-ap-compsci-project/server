const express = require('express');
const http = require('http');

const idGen = require(`./utils/idGen`);
const Game = require(`./class/game`);

const sessions = {};

const app = express();
const server = http.createServer(app)

app.get(`/newSession`, (req, res) => {
    const id = idGen(6);
    sessions[id] = new Game(server, id)
    return res.send({
        error: false,
        code: id,
        message: `Created new game!`
    })
})

server.listen(5000, () => {
    console.log(`Server is online!`)
})