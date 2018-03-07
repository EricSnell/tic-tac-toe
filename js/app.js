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
  let currentPlayer = 'x';
  let player1 = null;
  let player2 = null;
  let computer = false;

  const $board = document.getElementById('board');
  const $results = document.getElementById('results');
  const $resultsText = $results.querySelector('#results-text');
  const $newGameButton = $results.querySelector('#new-game');
  const $playerSelect = document.getElementById('players-select');
  const $characterSelect = document.getElementById('character-select');

  $playerSelect.addEventListener('click', selectPlayers);
  $characterSelect.addEventListener('click', selectCharacter);
  $board.addEventListener('click', play);


  function computerTurn() {
    console.log('computer turn', gameBoard);

    /*
    -- Check Player 1's positions on board
    -- If computer has 2 positions in either 4 directions, place turn in remaining space
    -- If Player 1 has 2 positions in either 4 directions, place turn in remaining space
    -- Otherwise place turn anywhere on board
    -- If player one not on board - place turn anywhere on board

          [ 1 , 1 , - ],
          [ - , -, - ],
          [ - , - , - ]

    */


    /* 
      For all if statements below -- add OR statement to check if === computer.
      This will allow you to either block Player1 from winning - or placing winning move
    */


    let tile;
    // Block Player1 Row
    for (let i = 0; i < gameBoard.length; i++) {
      console.log(player1);
      if ((gameBoard[i][0] === computer && gameBoard[i][1] === computer) ||
        (gameBoard[i][0] === player1 && gameBoard[i][1] === player1)) {
        // place turn in gameBoard[i][2]
        tile = findTile(i, 2);
        console.log(tile);
      }
      else if ((gameBoard[i][1] === computer && gameBoard[i][2] === computer) ||
        (gameBoard[i][1] === player1 && gameBoard[i][2] === player1)) {
        // place turn in gameBoard[i][0]
      }
    }

    // Block Player1 Column
    if ((gameBoard[0][0] === computer && gameBoard[1][0] === computer) ||
      (gameBoard[0][0] === player1 && gameBoard[1][0] === player1)) {
      // place turn in gameBoard[2][0]
    }
    else if ((gameBoard[0][1] === computer && gameBoard[1][1] === computer) ||
      (gameBoard[0][1] === player1 && gameBoard[1][1] === player1)) {
      // place turn in gameBoard[2][1]
    }
    else if ((gameBoard[0][2] === computer && gameBoard[1][2] === computer) ||
      (gameBoard[0][2] === player1 && gameBoard[1][2] === player1)) {
      // place turn in gameBoard[2][2]
    }
    else if ((gameBoard[2][0] === computer && gameBoard[1][0] === computer) ||
      (gameBoard[2][0] === player1 && gameBoard[1][0] === player1)) {
      // place turn gameBoard[0][0]
    }
    else if ((gameBoard[2][1] === computer && gameBoard[1][1] === computer) ||
      (gameBoard[2][1] === player1 && gameBoard[1][1] === player1)) {
      // place turn gameBoard[0][1]
    }
    else if ((gameBoard[2][2] === computer && gameBoard[1][2] === computer) ||
      (gameBoard[2][1] === player1 && gameBoard[1][1] === player1)) {
      // place turn gameBoard[0][2]
    }


    // Block Player1 Diagonal (top left bottom right)
    if ((gameBoard[0][0] === computer && gameBoard[1][1] === computer) ||
      (gameBoard[0][0] === player1 && gameBoard[1][1] === player1)) {
      // place turn gameBoard[2][2]
    }
    else if ((gameBoard[2][2] === computer && gameBoard[1][1] === computer) ||
      (gameBoard[2][2] === player1 && gameBoard[1][1] === player1)) {
      // place turn gameBoard[0][0]
    }


    // Block Player1 Diagonal (bottom left top right)
    if ((gameBoard[2][0] === computer && gameBoard[1][1] === computer) ||
      (gameBoard[2][0] === player1 && gameBoard[1][1] === player1)) {
      // place turn gameBoard[0][2]
    }
    else if ((gameBoard[0][2] === computer && gameBoard[1][1] === computer) ||
      (gameBoard[0][2] === player1 && gameBoard[1][1] === player1)) {
      // place turn gameBoard[2][0]
    }


  }

  function findTile(rowNumber, columnNumber) {
    return document.querySelector(`[data-row="${rowNumber}"][data-column="${columnNumber}"]`);
  }

  function selectPlayers(e) {
    e.stopPropagation();
    const { target } = e;
    if (target.tagName === 'LABEL') {
      computer = target.htmlFor === 'one-player';
    }
  }

  function selectCharacter(e) {
    e.stopPropagation();
    const { target } = e;
    if (target.tagName === 'LABEL') {
      const char1 = target.htmlFor;
      const char2 = char1 === 'x' ? 'o' : 'x';
      player1 = char1;
      if (computer) computer = char2;
      else player2 = char2;
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
    if (currentPlayer === player1) {
      tile.classList.add('playerOne');
      tile.innerHTML = player1;
    }
    else {
      tile.classList.add('playerTwo');
      tile.innerHTML = computer || player2;
    }
  }

  function updateBoard(row, column) {
    gameBoard[row][column] = currentPlayer;
  }

  function changePlayer() {
    if (computer) {
      if (currentPlayer === player1) {
        currentPlayer = computer;
        computerTurn();
      } else {
        currentPlayer = player1;
      }
    } else {
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
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