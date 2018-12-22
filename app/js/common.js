/**
 * 1. Function constructor like new Game()
 */

function createGame() {
    this.table = document.getElementById('game');
	this.coefficient = 3;
	this.reset = document.querySelector('#reset');
	this.quantity = this.coefficient * this.coefficient;
	if(localStorage.getItem("stepCount") != null) {
		this.stepCount = localStorage.getItem("stepCount");
	} else {
		this.stepCount = 0;
	}
	this.message = document.getElementById('message');
	if(localStorage.getItem('message') != null) {
		this.message.innerHTML = localStorage.getItem("message");
	}
    this.circles = '<svg aria-hidden="true" data-prefix="far" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-circle fa-w-16 fa-5x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" class=""> stub </path></svg>';
    this.crosses = '<svg aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-5x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""> stub </path></svg>';
	this.select = document.getElementById("select");
	if(localStorage.getItem("currentPlayer") != null) {
		this.player = localStorage.getItem("currentPlayer");
	} else {
		this.player = this.crosses;
	}

	this.buildMatrix = () => {
		if(localStorage.getItem("matrix") !== null) {
			this.matrix = JSON.parse(localStorage.getItem("matrix"));
		} else {
			let arr = new Array();
        	for(let i = 0; i < this.coefficient; i++){
            	arr[i] = new Array();
            	for(var j = 0; j < this.coefficient; j++){
                	arr[i][j] = 0;
            	}
        	}	
            this.matrix = arr;
		}
        
    };

	this.start = () => {
		this.buildMatrix();
		this.buildTableBetter()
	}

	this.buildTableBetter = () => {
	
		this.table.style.width = (70 * this.coefficient) + 6 + 'px';
		this.table.style.height = (70 * this.coefficient) + 6 + 'px';
		
		let tableContent = '';

		this.matrix.forEach((matrixRow, i) => {
			matrixRow.forEach((matrixCell, j) => {
				tableContent += `<div class="game_block" data-row="${i}" data-COLUMN="${j}">${renderCellContent(matrixCell)}</div>`
			});
		});

		this.table.innerHTML = tableContent;
		this.blocks = document.querySelectorAll('.game_block');
	}

	let renderCellContent = (nodeType) => {
		if(nodeType === 1) {
			return this.crosses;
		} else if(nodeType === -1) {
			return this.circles;
		} else {
			return '';
		}
	}


    

    this.rebuild = () => {
        this.quantity = this.coefficient * this.coefficient;
        this.table.innerHTML = '';
        this.buildTableBetter();
        this.buildMatrix();
        this.doReset();
    };

    this.changeTable = () => {
        let select          = document.getElementById("select");
        for( var key in select.options) {
            if(select.options[key].selected != null && select.options[key].selected == true ) {
                this.coefficient = parseInt((select.options[key].value), 10);
                this.rebuild();
            }
        }
	};
	
    this.mainLoop = (event) => {
        let target = event.target; 
	    let curentRow = target.getAttribute('data-row');
		let curentCol = target.getAttribute('data-column');
		
	    if(target.className == "game_block") {
			target.innerHTML = this.player;
		    if(this.player === this.crosses) {
			    this.matrix[curentRow][curentCol] += 1;
		    } else if(this.player === this.circles) {
			    this.matrix[curentRow][curentCol] += -1;
		    }

            this.matrix.forEach((element, index) => {
                let rowSum = 0;
                this.matrix[index].forEach((element, i) => {
                    rowSum += this.matrix[index][i];
                    
                });
                if(rowSum === this.coefficient || rowSum === -this.coefficient) {
					this.table.removeEventListener('click', this.mainLoop, false);
					this.message.innerHTML = 'Победил игрок ' + this.player;
			    } 

            })
        
            this.matrix.forEach((element, index) => {
                let colSum = 0;
                this.matrix[index].forEach((element, i) => {
                    colSum += this.matrix[i][index];
                });
                if(colSum === this.coefficient || colSum === -this.coefficient) {
                    this.table.removeEventListener('click', this.mainLoop, false);
					this.message.innerHTML = 'Победил игрок ' + this.player;	
                } 
            })

		    for(let i = this.coefficient - 1; i >= 0;){
			    let secondDiagonalSum = 0;
			    for(let j = 0; j < this.coefficient; j++){
				    secondDiagonalSum += this.matrix[j][i];
				    i--;
			    }
			    if(secondDiagonalSum === this.coefficient || secondDiagonalSum === -this.coefficient) {
					this.table.removeEventListener('click', this.mainLoop, false);
					this.message.innerHTML = 'Победил игрок ' + this.player;
			    } 
            }
            
		    for(var i = 0; i < this.coefficient;){
			    var diagonalSum = 0;
			    for(var j = 0; j < this.coefficient; j++){
				    diagonalSum += this.matrix[j][i];
				i++;
			    }
			    if(diagonalSum === this.coefficient || diagonalSum === -this.coefficient) {
				    this.table.removeEventListener('click', this.mainLoop, false);
					this.message.innerHTML = 'Победил игрок ' + this.player;
			    }
			}
			
			this.changePlayer();
			localStorage.setItem('currentPlayer', this.player);
			this.stepCount++;
	    } 
	    if (this.stepCount === this.quantity) {
			this.message.innerHTML = 'Ничья';
			localStorage.setItem("message", this.message.innerHTML);
		}
		localStorage.setItem("matrix", JSON.stringify(this.matrix));
		localStorage.setItem("stepCount", this.stepCount);
	};

    this.changePlayer = () => {
        if(this.player === this.crosses) {
            this.player = this.circles;
        }
        else {
            this.player = this.crosses;
        }
        if(this.message.innerText != "Победил игрок ") {
			this.message.innerHTML = 'Ходит игрок ' + this.player;
		}
		localStorage.setItem("message", this.message.innerHTML);
	};

	this.doReset = () => {
		Array.from(this.blocks).forEach((element, i) => {
			element.innerHTML = '';
		});
		this.player = this.crosses;
		this.message.innerHTML = 'Ходит игрок ' + this.player;
		this.stepCount = 0;
		this.matrix.forEach((element, i) => {
			this.matrix.forEach((element, j) => {
				this.matrix[i][j] = 0;
			})
		})
		localStorage.clear();
		this.table.addEventListener('click', this.mainLoop, false);
	};  
	this.table.addEventListener('click', this.mainLoop, false);
	this.reset.addEventListener('click', this.doReset, false);
};


const game = new createGame();


game.start();