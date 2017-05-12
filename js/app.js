(function() {
  
  var game = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }
  
  var gameBoard = game.board.map(function(arr) {
    return arr.slice();
  }),
      currentPlayer = 1,
      $board = document.getElementById('board'),
      $results = document.getElementById('results'),
      $resultsText = $results.querySelector('#results-text'),
      $newGameButton = $results.querySelector('#new-game');
  
         
  $board.addEventListener('click', play);
  
   
  function play(event) {
    var $tile = event.target,
        row = $tile.dataset.row,
        column = $tile.dataset.column;
    
    if (!gameBoard[row][column]) {
      colorTile($tile);
      updateBoard(row, column);
      findWinner(row, column);
    } else {
      console.log('TRY AGAIN!');
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
    currentPlayer === 1 ? 
      tile.classList.add('playerOne') : tile.classList.add('playerTwo');
  }
  
  function updateBoard(row, column) {
    gameBoard[row][column] = currentPlayer;
  }
  
  function changePlayer() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
  }
  
  function checkRows(row) {
    for (var i = 0; i < gameBoard[row].length; i++) {
      if (gameBoard[row][i] !== currentPlayer) {
        return;
      }
    } 
    return true;
  }
  
  function checkColumns(column) {
    for (var i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][column] !== currentPlayer) {
        return;
      }
    }
    return true
  }
  
  function checkDiagonalTop() { 
    for (var i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][i] !== currentPlayer) {
        return;
      } 
    }
    return true;
  }
  
  function checkDiagonalBottom() {
    for (var i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][(gameBoard.length - 1) - i] !== currentPlayer) {
        return;
      }
    }
    return true;
  }

  function isDraw() {
    for (var i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i].indexOf(null) !== -1) {
        return;
      }
    }
    return true;
  }
  
  function showResults(results) {
    $board.removeEventListener('click', play);
    $newGameButton.addEventListener('click', newGame);
    $results.classList.remove('hidden');
    $resultsText.innerHTML = results;
  }
  
  function newGame() {
    $results.classList.add('hidden');

    var $tiles = $board.querySelectorAll('.playerOne, .playerTwo');
    $tiles.forEach(function(elm) {
      elm.classList.remove('playerOne', 'playerTwo');
    })
        
    gameBoard = game.board.map(function(arr) {
      return arr.slice();
    });
    
    $newGameButton.removeEventListener('click', newGame);
    $board.addEventListener('click', play);
  }
     
  
})(); 