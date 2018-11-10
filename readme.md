# Игра "Крестики - Нолики"

---
[Смотреть Демо](https://artemchubatyi.github.io/tic_tac_toe/app/)

---

![markup](https://github.com/ArtemChubatyi/tic_tac_toe/blob/master/preview.bmp "Превью")

---

## JavaScript код:

```js
for (var i=0; i<9; i++) {
	document.getElementById('game').innerHTML+='<div class="game__block"></div>';
}
var turn = 0;
var crosses = '<i class="fas fa-times"></i>';
var circles = '<i class="far fa-circle"></i>';

document.getElementById('game').onclick = function(event) {
	if (event.target.className == 'game__block') {
		if (turn % 2 == 0) {
			event.target.innerHTML += crosses;
		}
		else  {
			event.target.innerHTML += circles;
		}
		turn++;
	}
	checkWinner();
}
function checkWinner() {
	var allBlocks = document.getElementsByClassName('game__block');
	if (allBlocks[0].innerHTML == crosses && allBlocks[1].innerHTML == crosses && allBlocks[2].innerHTML == crosses) {alert('Победил игрок 1');}
	if (allBlocks[3].innerHTML == crosses && allBlocks[4].innerHTML == crosses && allBlocks[5].innerHTML == crosses) {alert('Победил игрок 1');}
	if (allBlocks[6].innerHTML == crosses && allBlocks[7].innerHTML == crosses && allBlocks[8].innerHTML == crosses) {alert('Победил игрок 1');}
	if (allBlocks[0].innerHTML == crosses && allBlocks[3].innerHTML == crosses && allBlocks[6].innerHTML == crosses) {alert('Победил игрок 1');}
	if (allBlocks[1].innerHTML == crosses && allBlocks[4].innerHTML == crosses && allBlocks[7].innerHTML == crosses) {alert('Победил игрок 1');}
	if (allBlocks[2].innerHTML == crosses && allBlocks[5].innerHTML == crosses && allBlocks[8].innerHTML == crosses) {alert('Победил игрок 1');}
	if (allBlocks[0].innerHTML == crosses && allBlocks[4].innerHTML == crosses && allBlocks[8].innerHTML == crosses) {alert('Победил игрок 1');}
	if (allBlocks[3].innerHTML == crosses && allBlocks[4].innerHTML == crosses && allBlocks[7].innerHTML == crosses) {alert('Победил игрок 1');}
	
	if (allBlocks[0].innerHTML == circles && allBlocks[1].innerHTML == circles && allBlocks[2].innerHTML == circles) {alert('Победил игрок 2');}
	if (allBlocks[3].innerHTML == circles && allBlocks[4].innerHTML == circles && allBlocks[5].innerHTML == circles) {alert('Победил игрок 2');}
	if (allBlocks[6].innerHTML == circles && allBlocks[7].innerHTML == circles && allBlocks[8].innerHTML == circles) {alert('Победил игрок 2');}
	if (allBlocks[0].innerHTML == circles && allBlocks[3].innerHTML == circles && allBlocks[6].innerHTML == circles) {alert('Победил игрок 2');}
	if (allBlocks[1].innerHTML == circles && allBlocks[4].innerHTML == circles && allBlocks[7].innerHTML == circles) {alert('Победил игрок 2');}
	if (allBlocks[2].innerHTML == circles && allBlocks[5].innerHTML == circles && allBlocks[8].innerHTML == circles) {alert('Победил игрок 2');}
	if (allBlocks[0].innerHTML == circles && allBlocks[4].innerHTML == circles && allBlocks[8].innerHTML == circles) {alert('Победил игрок 2');}
	if (allBlocks[3].innerHTML == circles && allBlocks[4].innerHTML == circles && allBlocks[7].innerHTML == circles) {alert('Победил игрок 2');}
}
```

