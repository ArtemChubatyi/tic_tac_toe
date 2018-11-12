var ceil            = document.getElementsByClassName('game__block');
	reset           = document.getElementById('reset');
	message         = document.getElementById('message');
	stepCount       = 0;
    crosses         = '<svg aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-5x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>';
    circles         = '<svg aria-hidden="true" data-prefix="far" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-circle fa-w-16 fa-5x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" class=""></path></svg>';
	player          = crosses;
	winCombinations = [
		[1,2,3],
		[4,5,6],
		[7,8,9],
		[1,4,7],
		[2,5,8],
		[3,6,9],
		[1,5,9],
		[7,5,3]
	];
	dataX = [];
	data0 = [];


for (var i = 0; i < ceil.length; i++) {
	ceil[i].addEventListener('click', currentStep);
}

function currentStep() {
	var num = +this.getAttribute('data-ceil');
	if(this.innerHTML !== crosses && this.innerHTML !== circles) {
		this.innerHTML = player;
		if (player === crosses) {
			dataX.push(num);
		}
		else {
			data0.push(num);
		}
		if ((dataX.length > 2 || data0.length > 2 ) && (checkWin(data0, num) || checkWin(dataX, num))
		) {
			for (var i = 0; i < ceil.length; i++) {
				ceil[i].removeEventListener('click', currentStep);
			}
			return (message.innerHTML = 'Победил игрок ' + player);
		} 
		changePlayer();
		stepCount++;
		if (stepCount === 9) {
			message.innerHTML = 'Ничья';
		}
	}
}

function changePlayer() {
	if(player === crosses) {
		player = circles;
	}
	else {
		player = crosses;
	}
	message.innerHTML = 'Ходит игрок ' + player;
}

 reset.addEventListener('click', clear);

 function clear() {
	for (var i = 0; i < 9; i ++) {
		ceil[i].innerHTML = '';
	}
	dataX = [];
	data0 = [];
	player = crosses;
	message.innerHTML = 'Ходит игрок ' + player;
	stepCount = 0;
	for (var i = 0; i < ceil.length; i++) {
		ceil[i].addEventListener('click', currentStep);
	}
 }
 function checkWin(arr, number) {
	for(var i = 0, iLen = winCombinations.length; i < iLen; i++ ) {
		var possiblyWinningArray = winCombinations[i],
			count = 0;
		if(possiblyWinningArray.indexOf(number)!== -1) {
			for(j = 0, jLen = possiblyWinningArray.length; j < jLen; j++) {
				if ( arr.indexOf(possiblyWinningArray[j]) !== -1) {
					count++;
					if (count ===3) {
						return true;
					}
				}
			}
			count = 0;
		}
	}
 }
	
