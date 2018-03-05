(() => {
  'use strict';

  const game = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  let gameBoard = game.board.map(arr => arr.slice())
  let currentPlayer = 1;
  let computer = false;

  const $board = document.getElementById('board');
  const $results = document.getElementById('results');
  const $resultsText = $results.querySelector('#results-text');
  const $newGameButton = $results.querySelector('#new-game');
  const $options = document.getElementById('options');

  $options.addEventListener('click', selectPlayers);
  $board.addEventListener('click', play);

  /* FUNCTIONS FOR COMPUTER TURN 
  -- Check Player 1's positions on board
  -- If computer has 2 positions in either 4 directions, place turn in remaining space
  -- If Player 1 has 2 positions in either 4 directions, place turn in remaining space
  -- Otherwise place turn anywhere on board
  -- If player one not on board - place turn anywhere on board
  */











  function selectPlayers(e) {
    e.stopPropagation();
    const { target } = e;
    if (target.tagName === 'LABEL') {
      computer = target.htmlFor === 'one-player';
    }
  }

  function play(event) {
    if (event.target.tagName === 'DIV') {
      const $tile = event.target;
      const { row } = $tile.dataset;
      const { column } = $tile.dataset;

      if (!gameBoard[row][column]) {
        colorTile($tile);
        updateBoard(row, column);
        findWinner(row, column);
      } else {
        console.log('TRY AGAIN!');
      }
    }
  }

  function findWinner(row, column) {
    if (checkDiagonalTop() || checkDiagonalBottom() || checkRows(row) || checkColumns(column)) {
      showResults(`Player ${currentPlayer} Wins!`);
    } else if (isDraw()) {
      showResults('Draw');
    } else {
      changePlayer();
    }
  }

  function colorTile(tile) {
    if (currentPlayer === 1) {
      tile.classList.add('playerOne');
    }
    else {
      tile.classList.add('playerTwo');
    }
  }

  function updateBoard(row, column) {
    gameBoard[row][column] = currentPlayer;
  }

  function changePlayer() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
  }

  function checkRows(row) {
    for (let i = 0; i < gameBoard[row].length; i++) {
      if (gameBoard[row][i] !== currentPlayer) return;
    }
    return true;
  }

  function checkColumns(column) {
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][column] !== currentPlayer) return;
    }
    return true;
  }

  function checkDiagonalTop() {
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][i] !== currentPlayer) return;
    }
    return true;
  }

  function checkDiagonalBottom() {
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][(gameBoard.length - 1) - i] !== currentPlayer) return;
    }
    return true;
  }

  function isDraw() {
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i].indexOf(null) !== -1) return;
    }
    return true;
  }

  function showResults(resultText) {
    $board.removeEventListener('click', play);
    $newGameButton.addEventListener('click', newGame);
    $results.classList.remove('hidden');
    $resultsText.innerHTML = resultText;
  }

  function newGame() {
    const $tiles = $board.querySelectorAll('.playerOne, .playerTwo');
    gameBoard = game.board.map(arr => arr.slice());

    $tiles.forEach(elm => elm.classList.remove('playerOne', 'playerTwo'));

    $results.classList.add('hidden');

    $newGameButton.removeEventListener('click', newGame);
    $board.addEventListener('click', play);
  }

})()