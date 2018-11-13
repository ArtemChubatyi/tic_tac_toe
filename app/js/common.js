var ceil            		= document.getElementsByClassName('game__block');
	normalCeil      		= document.getElementsByClassName('normal-game__block');
	largeCeil      			= document.getElementsByClassName('large-game__block');
	reset          		 	= document.getElementById('reset');
	message         		= document.getElementById('message');
	smallGame      			= document.getElementById('small');
	normalGame 				= document.getElementById('normal');
	largeGame 				= document.getElementById('large');
	smallGameField  		= document.getElementById('game');
	normalGameField 		= document.getElementById('normal-game');
	largeGameField  		= document.getElementById('large-game');
	permissionForSmall      = true;
	permissionForNormal 	= false;
	permissionForLarge 		= false;
	stepCount       		= 0;
    crosses         		= '<svg aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-5x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>';
    circles         		= '<svg aria-hidden="true" data-prefix="far" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-circle fa-w-16 fa-5x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" class=""></path></svg>';
	player          		= crosses;
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
	winCombinationsNormal = [
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,16],
		[1,5,9,13],
		[2,6,10,14],
		[3,7,11,15],
		[4,8,12,16],
		[1,6,11,16],
		[13,10,7,4]
	]
	winCombinationsLarge = [
		[1,2,3,4,5,6,7,8,9,10],
		[11,12,13,14,15,16,17,18,19,20],
		[21,22,23,24,25,26,27,28,29,30],
		[31,32,33,34,35,36,37,38,39,40],
		[41,42,43,44,45,46,47,48,49,50],
		[51,52,53,54,55,56,57,58,59,60],
		[61,62,63,64,65,66,67,68,69,70],
		[71,72,73,74,75,76,77,78,79,80],
		[81,82,83,84,85,86,87,88,89,90],
		[91,92,93,94,95,96,97,98,99,100],
		[1,11,21,31,41,51,61,71,81,91],
		[2,12,22,32,42,52,62,72,82,92],
		[3,13,23,33,43,53,63,73,83,93],
		[4,14,24,34,44,54,64,74,84,94],
		[5,15,25,35,45,55,65,75,85,95],
		[6,16,26,36,46,56,66,76,86,96],
		[7,17,27,37,47,57,67,77,87,97],
		[8,18,28,38,48,58,68,78,88,98],
		[9,19,29,39,49,59,69,79,89,99],
		[10,20,30,40,50,60,70,80,90,100],
		[1,12,23,34,45,56,67,78,89,100],
		[91,82,73,64,55,46,37,28,19,10]
	]
	dataX = [];
	data0 = [];



function changeGame() {
	var select          = document.getElementById("select");
	var selectedOption  = select.options[select.selectedIndex].value;
	if	(selectedOption == 1) {
		permissionForSmall = true;
		startSmallGame();
	}
	if (selectedOption == 2) {
		permissionForNormal = true;
		startNormalGame();
	}
	if (selectedOption == 3) {
		permissionForLarge = true;
		startLargeGame();
	}

}

function suspendPermissionSmall() {
	permissionForSmall = false;
}
function suspendPermissionNormal() {
	permissionForNormal = false;
}
function suspendPermissionLarge() {
	permissionForLarge = false;
}
startSmallGame();	
		


function startSmallGame() {

	if(!permissionForSmall) return false;

	suspendPermissionNormal();
	suspendPermissionLarge();

	clear();

	if(normalGameField.style.display == 'block' || largeGameField.style.display == 'block') {
		normalGameField.style.display = "none",
		largeGameField.style.display = "none",
		smallGameField.style.display = "block";
	};

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
}


function startNormalGame() {
	if(!permissionForNormal) return false;

	suspendPermissionSmall();
	suspendPermissionLarge();

	clear();

	if(smallGameField.style.display == 'block' || largeGameField.style.display == 'block') {
		smallGameField.style.display = "none",
		largeGameField.style.display = "none",
		normalGameField.style.display = "block";
	};

	for (var i = 0; i < normalCeil.length; i++) {
		normalCeil[i].addEventListener('click', currentStep);
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
			if ((dataX.length > 3 || data0.length > 3 ) && (checkWin(data0, num) || checkWin(dataX, num))
			) {
				for (var i = 0; i < normalCeil.length; i++) {
					normalCeil[i].removeEventListener('click', currentStep);
				}
				return (message.innerHTML = 'Победил игрок ' + player);
			} 
			changePlayer();
			stepCount++;
			if (stepCount === 16) {
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
		for (var i = 0; i < 16; i ++) {
			normalCeil[i].innerHTML = '';
		}
		dataX = [];
		data0 = [];
		player = crosses;
		message.innerHTML = 'Ходит игрок ' + player;
		stepCount = 0;
		for (var i = 0; i < normalCeil.length; i++) {
			normalCeil[i].addEventListener('click', currentStep);
		}
	}
	function checkWin(arr, number) {
		for(var i = 0, iLen = winCombinationsNormal.length; i < iLen; i++ ) {
			var possiblyWinningArray = winCombinationsNormal[i],
				count = 0;
			if(possiblyWinningArray.indexOf(number)!== -1) {
				for(j = 0, jLen = possiblyWinningArray.length; j < jLen; j++) {
					if ( arr.indexOf(possiblyWinningArray[j]) !== -1) {
						count++;
						if (count ===4) {
							return true;
						}
					}
				}
				count = 0;
			}
		}
	}
}

function startLargeGame() {
	if(!permissionForLarge) return false;

	suspendPermissionSmall();
	suspendPermissionNormal();

	clear();

	if(smallGameField.style.display == 'block' || normalGameField.style.display == 'block') {
		smallGameField.style.display = "none",
		normalGameField.style.display = "none",
		largeGameField.style.display = "block";
	};

	for (var i = 0; i < largeCeil.length; i++) {
		largeCeil[i].addEventListener('click', currentStep);
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
			if ((dataX.length > 9 || data0.length > 9 ) && (checkWin(data0, num) || checkWin(dataX, num))
			) {
				for (var i = 0; i < largeCeil.length; i++) {
					largeCeil[i].removeEventListener('click', currentStep);
				}
				return (message.innerHTML = 'Победил игрок ' + player);
			} 
			changePlayer();
			stepCount++;
			if (stepCount === 100) {
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
		for (var i = 0; i < 100; i ++) {
			largeCeil[i].innerHTML = '';
		}
		dataX = [];
		data0 = [];
		player = crosses;
		message.innerHTML = 'Ходит игрок ' + player;
		stepCount = 0;
		for (var i = 0; i < largeCeil.length; i++) {
			largeCeil[i].addEventListener('click', currentStep);
		}
	}
	function checkWin(arr, number) {
		for(var i = 0, iLen = winCombinationsLarge.length; i < iLen; i++ ) {
			var possiblyWinningArray = winCombinationsLarge[i],
				count = 0;
			if(possiblyWinningArray.indexOf(number)!== -1) {
				for(j = 0, jLen = possiblyWinningArray.length; j < jLen; j++) {
					if ( arr.indexOf(possiblyWinningArray[j]) !== -1) {
						count++;
						if (count === 10) {
							return true;
						}
					}
				}
				count = 0;
			}
		}
	}
}