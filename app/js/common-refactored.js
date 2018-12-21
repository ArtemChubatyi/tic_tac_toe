function createGame() {
    this.table = document.getElementById('game');
    this.coefficient = 3;
    this.quantity = this.coefficient * this.coefficient;
    this.matrix = this.buildMatrix();
    this.stepCount = 0;
    this.message = document.getElementById('message');
    this.circles = '<svg aria-hidden="true" data-prefix="far" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-circle fa-w-16 fa-5x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" class=""> stub </path></svg>';
    this.crosses = '<svg aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-5x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""> stub </path></svg>';
    this.select = document.getElementById("select");
    this.player = this.crosses;
    this.buildTable = () => {
        this.table.style.width = (70 * this.coefficient) + 6 + 'px';
        this.table.style.height = (70 * this.coefficient) + 6 + 'px';
        for (let c = 0; c < this.coefficient; c++) {
            for (let i = 0; i <  this.coefficient; i++) {
                this.table.innerHTML += `<div class="game_block" data-row="${c}"  data-COLUMN="${i}"></div>`;
            }
        }
    
    };
    this.buildMatrix = () => {
        let arr = new Array();
        for(let i = 0; i < this.coefficient; i++){
            arr[i] = new Array();
            for(var j = 0; j < this.coefficient; j++){
                arr[i][j] = 0;
            }
        }
            return arr;
    }

    this.rebuild = () => {
        this.quantity = this.coefficient * this.coefficient;
        this.table.innerHTML = '';
        this.buildTable();
        this.buildMatrix();
            // doReset();
        }
    }

    this.changeTable = () => {
        let select          = document.getElementById("select");
        for( var key in select.options) {
            if(select.options[key].selected != null && select.options[key].selected == true ) {
                this.coefficient = parseInt((select.options[key].value), 10);
                this.rebuild();
            }
        }
    }
    this.mainLoop = (event) => {
        let target = event.target; 
	    let curentRow = target.getAttribute('data-row');
	    let curentCol = target.getAttribute('data-column');

	    if(target.className == "game_block") {
		    target.innerHTML = player;
		    if(player === crosses) {
			    this.matrix[curentRow][curentCol] += 1;
		    } else if(player === circles) {
			    this.Matrix[curentRow][curentCol] += -1;
		    }

            this.matrix.forEach((element, index) => {
                let rowSum = 0;
                this.matrix[index].forEach((element, i) => {
                    rowSum += this.matrix[index][i];
                    
                });
                if(rowSum === this.coefficient || rowSum === -this.coefficient) {
				    this.table.removeEventListener('click', mainLoop, false);
				    return this.message.innerHTML = 'Победил игрок ' + this.player;	
			    } 

            })
        
            this.matrix.forEach((element, index) => {
                let colSum = 0;
                this.matrix[index].forEach((element, i) => {
                    colSum += this.matrix[i][index];
                });
                if(colSum === this.coefficient || colSum === -this.coefficient) {
                    this.table.removeEventListener('click', mainLoop, false);
                    return this.message.innerHTML = 'Победил игрок ' + this.player;	
                } 
            })

		    for(let i = this.coefficient - 1; i >= 0;){
			    let secondDiagonalSum = 0;
			    for(let j = 0; j < coefficient; j++){
				    secondDiagonalSum += this.matrix[j][i];
				    i--;
			    }
			    if(secondDiagonalSum === this.coefficient || secondDiagonalSum === -this.coefficient) {
				    this.table.removeEventListener('click', mainLoop, false);
				    return this.message.innerHTML = 'Победил игрок ' + player;
			    } 
            }
            
		    for(var i = 0; i < this.coefficient;){
			    var diagonalSum = 0;
			    for(var j = 0; j < this.coefficient; j++){
				    diagonalSum += this.matrix[j][i];
				i++;
			    }
			    if(diagonalSum === this.coefficient || diagonalSum === -this.coefficient) {
				    this.table.removeEventListener('click', mainLoop, false);
				    return this.message.innerHTML = 'Победил игрок ' + player;
			    }
		    }
		    changePlayer();
		    this.stepCount++;
	    } 
	    if (this.stepCount === this.quantity) {
		    this.message.innerHTML = 'Ничья';
	    }
    }
    this.changePlayer = () => {
        if(this.player === this.crosses) {
            this.player = this.circles;
        }
        else {
            this.player = this.crosses;
        }
        this.message.innerHTML = 'Ходит игрок ' + player;
    }
    
};


const game = new createGame();
game.table.addEventListener('click', game.mainLoop, false);
game.buildTable();
game.buildMatrix();
