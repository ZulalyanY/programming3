var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)

var fs = require("fs")
app.use(express.static("."))

app.get("/", function (req, res) {
    res.redirect("index.html")
})
server.listen(3000, () => {
    console.log("server run");
})


function generator(matLen, gr, grEat, grGiant, grStone, grFox) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < grGiant; i++) {
        let x = 0
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < grStone; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4
        }
    }
    for (let i = 0; i < grFox; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = 0
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5
        }
    }
    return matrix;
}

matrix = generator(30, 30, 15, 7, 15, 6);

io.sockets.emit("send matrix", matrix)

grassArr = []
grassEaterArr = []
grassGiantArr = []
grassStoneArr = []
grassFoxArr = []

Grass  = require("./grass")
Eater  = require("./eater")
Fox = require("./fox")
Geant = require("./geant")
/* Stone = require("./stone") */