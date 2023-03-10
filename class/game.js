const ws = require('ws');

const Player = require(`./game/player`)

module.exports = class BattleshipGame {
    constructor(server, id) {
        if(server && id) {
            this.server = server;
            this.wss = new ws.WebSocketServer({ server: this.server, path: `/game/${id}` });

            this.wss.on(`connection`, (ws) => this.connectionHandler(ws))
        } else throw new Error(`No server object and/or ID!`)
    }

    connected = 0

    players = [ new Player(), new Player() ]

    connectionHandler(ws) {
        if(connected >= 2) return ws.close(1000, `Two players already connected.`)

        const playerID = connected++;

        players[playerID].ws = ws;

        console.log(`Player ${playerID} joined!`)

        ws.send({ player: playerID })

        ws.on(`message`, m => {
            console.log(`Player ${playerID} WS:`, m)
        })
    }

    endGame(msg) {
        this.players.forEach(player => {
            player.ws.send({closing: true, message: msg || `Server is closing the game.`});
            player.ws.close()
        })
    }
}