var block            		= document.getElementsByClassName('game_block');
	coefficient 			= +prompt('Enter the number');
	quantity 				= coefficient * coefficient;
	reset          		 	= document.getElementById('reset');
	message         		= document.getElementById('message');
	// smallGame      			= document.getElementById('small');
	game  					= document.getElementById('game');
	stepCount       		= 0;
    crosses         		= '<svg aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-5x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>';
    circles         		= '<svg aria-hidden="true" data-prefix="far" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-circle fa-w-16 fa-5x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" class=""></path></svg>';
	player          		= crosses;


game.style.width = (70 * coefficient) + 6 + 'px';
game.style.height = (70 * coefficient) + 6 + 'px';

for (var c = 0; c < coefficient; c++) {
	for (var i = 0; i <  coefficient; i++) {
		game.innerHTML += `<div class="game_block" data-row="${c}"  data-COLUMN="${i}"></div>`;
	}
}

function matrixArray(){
	var arr = new Array();
	for(var i=0; i<coefficient; i++){
	  arr[i] = new Array();
	  for(var j=0; j<coefficient; j++){
		arr[i][j] = 0;
	  }
	}
	return arr;
  }

var myMatrix = matrixArray();

for(var i = 0; i < myMatrix.length; i++) {
	var rowSum = 0;
	for(var j = 0; j < myMatrix.length ;j++){
		rowSum += myMatrix[i][j];
	}
  }

// function changeGame() {
// 	var select          = document.getElementById("select");
// 	var selectedOption  = select.options[select.selectedIndex].value;
// 	if	(selectedOption == 1) {
		
// 	}
// 	if (selectedOption == 2) {
		
// 	}
// 	if (selectedOption == 3) {
		
// 	}
// }

// clear();



var listener = function(event) {

	var target = event.target; 
	var curentRow = target.getAttribute('data-row');
	var curentCol = target.getAttribute('data-column');
	console.log(curentCol, curentRow);

	if(target.innerHTML !== crosses && target.innerHTML !== circles) {
		target.innerHTML = player;
		if(player === crosses) {
			myMatrix[curentRow][curentCol] += 1;
		} else if(player === circles) {
			myMatrix[curentRow][curentCol] += -1;
		}

		for(var i = 0; i < coefficient; i++){
			var rowSum = 0;
			for(var j = 0; j < coefficient; j++){
				rowSum += myMatrix[i][j];
			}
			if(rowSum === coefficient || rowSum === -coefficient) {
				game.removeEventListener('click', listener, false);
				return message.innerHTML = 'Победил игрок ' + player;	
			} 
		}

		for(var i = 0; i < coefficient; i++){
			var colSum = 0;
			for(var j = 0; j < coefficient; j++){
				colSum += myMatrix[j][i];
			}
			if(colSum === coefficient || colSum === -coefficient) {
				game.removeEventListener('click', listener, false);
				return message.innerHTML = 'Победил игрок ' + player;
			}
		}
		for(var i = coefficient - 1; i >= 0;){
			var secondDiagonalSum = 0;
			for(var j = 0; j < coefficient; j++){
				secondDiagonalSum += myMatrix[j][i];
				i--;
			}
			if(secondDiagonalSum === coefficient || secondDiagonalSum === -coefficient) {
				game.removeEventListener('click', listener, false);
				return message.innerHTML = 'Победил игрок ' + player;
			} 
		}
		for(var i = 0; i < coefficient;){
			var diagonalSum = 0;
			for(var j = 0; j < coefficient; j++){
				diagonalSum += myMatrix[j][i];
				i++;
			}
			if(diagonalSum === coefficient || diagonalSum === -coefficient) {
				game.removeEventListener('click', listener, false);
				return message.innerHTML = 'Победил игрок ' + player;
			}
		}
		changePlayer();
		stepCount++;
	} else {
		alert('это место занято');
	}
	if (stepCount === quantity) {
		message.innerHTML = 'Ничья';
	}
};

game.addEventListener('click', listener, false);

function changePlayer() {
	if(player === crosses) {
		player = circles;
	}
	else {
		player = crosses;
	}
	message.innerHTML = 'Ходит игрок ' + player;
};


var doReset = function clear() {
	for (var i = 0; i < quantity; i ++) {
		block[i].innerHTML = '';
	}
	player = crosses;
	message.innerHTML = 'Ходит игрок ' + player;
	stepCount = 0;
	for(var i=0; i < coefficient; i++){
		for(var j=0; j<coefficient; j++){
			myMatrix[i][j] = 0;
		}
	  }
	game.addEventListener('click', listener, false);
}
reset.addEventListener('click', doReset, false);

