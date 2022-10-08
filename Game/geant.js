class GrassGiant extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y + 1]
        ];
    }
    
    /* chooseCell------------------ */
    chooseCell(character) {
        this.getNewCoordinates()
        super.chooseCell(character)
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