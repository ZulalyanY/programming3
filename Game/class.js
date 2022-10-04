class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= 0 && y < matrix[0].length && x >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }



}


class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 0
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrass = new GrassEater(newX, newY);
            grassEaterArr.push(newGrass);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

class GrassGiant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    clearField() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(1)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        var emptyCells2 = this.chooseCell(2)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell1) {
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell2) {
            var newX = newCell2[0]
            var newY = newCell2[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        if (this.multiply == matrix.length) {
            this.die()
        }
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newGrass = new GrassGiant(newX, newY);
            grassGiantArr.push(newGrass);
            this.multiply = 0;
        }
    }
    test() {
        this.multiply++;
        for (let i = 0; i < 1; i++) {
            let x = Math.floor(Math.random() * 15)
            let y = 0;
            if (matrix[x][y] == 0) {
                matrix[this.y][this.x] = 3;
                let gr = new GrassGiant(x, y)
                grassGiantArr.push(gr)
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassGiantArr) {
            if (this.x == grassGiantArr[i].x && this.y == grassGiantArr[i].y) {
                grassGiantArr.splice(i, 1);
                break;
            }
        }
    }
}

class GrassStone {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 2
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
        ];
    }
}

class GrassFox {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 7
        this.directions = []
    }


    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= 0 && y< matrix[0].length && x >= 0 && x < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newGrass = new GrassFox(newX, newY);
            grassFoxArr.push(newGrass);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    clearField() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(1)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        var emptyCells2 = this.chooseCell(2)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell1) {
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell2) {
            var newX = newCell2[0]
            var newY = newCell2[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        if (this.multiply == matrix.length) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassFoxArr) {
            if (this.x == grassFoxArr[i].x && this.y == grassFoxArr[i].y) {
                grassFoxArr.splice(i, 1);
                break;
            }
        }
    }
}
