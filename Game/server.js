var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)

var fs = require("fs")
app.use(express.static("."))

app.get("/", function (req, res) {
    res.redirect("index.html")
})
server.listen(3000, function () {
    console.log("server is run");
})


function generator(matLen, gr, grEat, grGiant, grStone, grFox) {
    var matrix = [];
    for (var i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (var j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (var i = 0; i < gr; i++) {
        var x = Math.floor(Math.random() * matLen);
        var y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (var i = 0; i < grEat; i++) {
        var x = Math.floor(Math.random() * matLen);
        var y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (var i = 0; i < grGiant; i++) {
        var x = 0
        var y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (var i = 0; i < grStone; i++) {
        var x = Math.floor(Math.random() * matLen);
        var y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4
        }
    }
    for (var i = 0; i < grFox; i++) {
        var x = Math.floor(Math.random() * matLen);
        var y = 0
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5
        }
    }
    return matrix;
}


matrix = generator(30, 30, 15, 7, 15, 6);

////io.sockets.emit("send matrix", matrix)





function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                var gr = new GrassGiant(x, y)
                grassGiantArr.push(gr)
            } else if (matrix[y][x] == 4) {
                var gr = new GrassStone(x, y)
                grassStoneArr.push(gr)
            } else if (matrix[y][x] == 5) {
                var gr = new GrassFox(x, y)
                grassFoxArr.push(gr)
            }
        }
    }

    io.sockets.emit("send matrix", matrix)
}


grassArr = []
grassEaterArr = []
grassGiantArr = []
grassStoneArr = []
grassFoxArr = []



Grass = require("./grass")
Eater = require("./eater")
Fox = require("./fox")
Geant = require("./geant")
Stone = require("./stone")



io.on("connection", function () {
    createObject()
})