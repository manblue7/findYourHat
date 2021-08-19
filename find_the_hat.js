//Codecademy project by Manblue7

const prompt = require('prompt-sync')({
	signit: true
});

class Field {
	constructor(fieldSize, difficulty) {
		this.fieldSize = fieldSize;
		this.difficulty = difficulty;
		this.hat = '^';
		this.hole = 'O';
		this.fieldDef = '░';
		this.path = '*';
		this.player = 'S';
		this.field = [];
	}
	generateField() {

		for (let i = 0; i < this.fieldSize; i++) {
			let newArr = new Array(this.fieldSize);
			this.field.push(newArr);
			for (let k = 0; k < this.fieldSize; k++) {
				this.field[i][k] = this.fieldDef;
			}
		}
		for (let i = 0; i < Math.floor(Math.random() * ((this.fieldSize * this.fieldSize) - (this.fieldSize + 10)) + 15); i++) {
			this.field[Math.floor(Math.random() * this.fieldSize)][Math.floor(Math.random() * this.fieldSize)] = this.hole;
		}
		while (true) {
			let random = Math.floor(Math.random() * this.fieldSize);
			let random2 = Math.floor(Math.random() * this.fieldSize);
			if (this.field[random][random2] === this.fieldDef) {
				this.field[random][random2] = this.hat;
				while (true) {
					random = Math.floor(Math.random() * this.fieldSize);
					random2 = Math.floor(Math.random() * this.fieldSize);
					if (this.field[random][random2] === this.fieldDef) {
						this.field[random][random2] = this.player;
						break;
					}
				}
				break;

			} else {
				continue;
			}
		}
	}

	printField() {
		let strField = '';
		for (let i = 0; i < this.fieldSize; i++) {
			strField += this.field[i].join('')
		}

		for (let i = 0; i <= this.fieldSize * this.fieldSize; i += this.fieldSize) {
			let num = 1;
			console.log(strField.substr(i, this.fieldSize * num));
			num += 1;
		}
	}
}


function getNestedInd(arr, value) {
	for (let i = 0; i < arr.length; i++) {
		let ind = arr[i].indexOf(value);
		if (ind != -1) {
			return [i, ind];
		}
	}
}


while (true) {
	console.log('Welcome to find the hat! Input field size (recomended 9-15) move your player S and avoid the holes O and find your hat ^! (W A S D to move), "quit" to quit');
	let fieldSize = prompt('Field size: ');
	if (!isNaN(fieldSize)) {
		let field = new Field(parseInt(fieldSize));
		field.generateField();
		field.printField();
		while (true) {
			let playerPos = getNestedInd(field.field, field.player);
			let input = prompt('');
			if (input.toLowerCase() === 'w') {
				if (playerPos[0] != 0) {
					if (field.field[playerPos[0] - 1][playerPos[1]] === field.hat) {
						console.log('YOU WIN!!!');
						break;
					}
					if (field.field[playerPos[0] - 1][playerPos[1]] === field.hole) {
						console.log('GAME OVER');
						break;
					} else {

						field.field[playerPos[0] - 1][playerPos[1]] = field.player;
						field.field[playerPos[0]][playerPos[1]] = field.path;
						playerPos = getNestedInd(field.field, field.player);
						field.printField();
					}
				}
			}
			if (input.toLowerCase() === 'a') {
				if (playerPos[1] != 0) {
					if (field.field[playerPos[0]][playerPos[1] - 1] === field.hat) {
						console.log('YOU WIN!!!');
						break;
					}
					if (field.field[playerPos[0]][playerPos[1] - 1] === field.hole) {
						console.log('GAME OVER');
						break;
					} else {

						field.field[playerPos[0]][playerPos[1] - 1] = field.player;
						field.field[playerPos[0]][playerPos[1]] = field.path;
						playerPos = getNestedInd(field.field, field.player);
						field.printField();
					}
				}
			}
			if (input.toLowerCase() === 's') {
				if (playerPos[0] != field.field.length - 1) {
					if (field.field[playerPos[0] + 1][playerPos[1]] === field.hat) {
						console.log('YOU WIN!!!');
						break;
					}
					if (field.field[playerPos[0] + 1][playerPos[1]] === field.hole) {
						console.log('GAME OVER');
						break;
					} else {

						field.field[playerPos[0] + 1][playerPos[1]] = field.player;
						field.field[playerPos[0]][playerPos[1]] = field.path;
						playerPos = getNestedInd(field.field, field.player);
						field.printField();
					}
				}
			}
			if (input.toLowerCase() === 'd') {
				if (playerPos[1] != field.field[0].length - 1) {
					if (field.field[playerPos[0]][playerPos[1] + 1] === field.hat) {
						console.log('YOU WIN!!!');
						break;
					}
					if (field.field[playerPos[0]][playerPos[1] + 1] === field.hole) {
						console.log('GAME OVER');
						break;
					} else {

						field.field[playerPos[0]][playerPos[1] + 1] = field.player;
						field.field[playerPos[0]][playerPos[1]] = field.path;
						playerPos = getNestedInd(field.field, field.player);
						field.printField();
					}
				}
			}
            if(input.toLowerCase() == 'quit') {
                break;
            }

		}
        
	}
    if(fieldSize.toLowerCase() == 'quit') {
        break;
    }

}