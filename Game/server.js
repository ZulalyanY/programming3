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


function generator(matLen, gr, grEat, grGiant, grStone, grFox, grEatEat) {
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
    for (var i = 0; i < grEatEat; i++) {
        var x = Math.floor(Math.random() * matLen);
        var y = 0
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6
        }
    }
    return matrix;
}


matrix = generator(30, 10, 15, 7, 15, 10, 5);

io.sockets.emit("send matrix", matrix)

grassArr = []
grassEaterArr = []
grassGiantArr = []
grassStoneArr = []
grassFoxArr = []
grassEaterEaterArr = []



Grass = require("./grass")
GrassEater = require("./eater")
GrassFox = require("./fox")
GrassGiant = require("./geant")
GrassStone = require("./stone")
GrassEaterEater = require("./eater2")




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
            } else if (matrix[y][x] == 6) {
                var gr = new GrassFox(x, y)
                grassFoxArr.push(gr)
            }
        }
    }

    io.sockets.emit("send matrix", matrix)
}



function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()

    }
    for (var k in grassGiantArr) {
        grassGiantArr[k].clearField()
    }

    for (var s in grassFoxArr) {
        grassFoxArr[s].clearField()
    }
    for (var l in grassEaterEaterArr) {
        grassEaterEaterArr[l].mul()
        grassEaterEaterArr[l].eat()

    }

    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 300)

var weath
/////exanakner
function Winter() {
    weath = "winter"
    io.sockets.emit("Winter", weath)
}
function Summer() {
    weath = "summer"
    io.sockets.emit("Summer", weath)

}
function Spring() {
    weath = "spring"
    io.sockets.emit("Spring", weath)
}
function Autumn() {
    weath = "autumn"
    io.sockets.emit("Autumn", weath)
}



////////funkcianer 

function killAll() {
    grassArr = [];
    grassEaterArr = [];
    grassEaterEaterArr = [];
    grassFoxArr = [];
    grassStoneArr = [];
    grassGiantArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function spawnGrass() {
    for (var i = 0; i < 12; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGrEater() {
    for (var i = 0; i < 2; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var et = new GrassEater(x, y);
            grassEaterArr.push(et);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGrEaterEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var eat2 = new GrassEaterEater(x, y);
            grassEaterEaterArr.push(eat2);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnFox() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            var fox = new GrassFox(x, y);
            grassFoxArr.push(fox);
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function spawnStone() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var st = new GrassStone(x, y);
            grassStoneArr.push(st);
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function spawnGiant() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6;
            var gi = new GrassGiant(x, y);
            grassGiantArr.push(gi);
        }
    }
    io.sockets.emit("send matrix", matrix);
}






var statistics = {}

setInterval(function () {
    statistics.grass = grassArr.length
    statistics.GrassEater = grassEaterArr.length
    statistics.GrassFox = grassFoxArr.length
    statistics.GrassGiant = grassGiantArr.length
    statistics.GrassStone = grassStoneArr.length
    statistics.GrassEterEaterArr = grassEaterEaterArr.length

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("statistics")
    })
}, 1000)

io.on("connection", function (socket) {
    createObject()

    socket.on("Kill All", killAll);
    socket.on("spawnGr", spawnGrass);
    socket.on("GrassEater", spawnGrEater);
    socket.on("GrEaterEater", spawnGrEaterEater);
    socket.on("Fox", spawnFox);
    socket.on("Stone", spawnStone);
    socket.on("Giant", spawnGiant);
    socket.on("spring", Spring);
    socket.on("summer", Summer);
    socket.on("autumn", Autumn);
    socket.on("winter", Winter);
})

