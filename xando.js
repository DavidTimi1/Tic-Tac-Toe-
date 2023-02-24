// PRE-GAME SETTINGS
let game = document.querySelector(".game")
let playModal = document.querySelector(".play-modal");
let modalContainer = document.querySelector(".modal-container");
let regModal = document.querySelector(".reg-modal");
let playBut = document.getElementById("play-but");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let regErr = document.getElementById("reg-error");
let winnerOverlay = document.querySelector(".winner-overlay");
let drawOverlay = document.querySelector(".draw-overlay");
let verifyOverlay = document.querySelector(".verify-overlay");
let table = document.getElementById("table");

// open the first modal
playModal.classList.add("open-modal");

function playGame(){
   // switch the modals 
   playModal.classList.remove("open-modal");
   regModal.classList.add("open-modal");
}


function register(){
   // store the usernames
   const p1Name = p1.value;
   const p2Name = p2.value;

// if two "valid" names have been entered, play
    if( p1Name != "" && p2Name != ""){
      if(p1Name == p2Name){
         // if the two names are the same reject
         regErr.innerHTML = "You cannot enter the same Player Name"
      }
      else{
         regModal.classList.remove("open-modal");
         modalContainer.classList.add("hide-cont");
         game.classList.add("visible");
    }
   }
   // if all names were not supplied, reject
    if(p1Name == "" && p2Name != "") {
       regErr.innerHTML = "Please enter Player 1 Name"
    }
    if(p1Name != "" && p2Name == "") {
       regErr.innerHTML = "Please enter Player 2 Name";
    }
    if (p1Name == "" && p2Name == "") {
       regErr.innerHTML = "Please enter both Players Names";
    }

}

// players
const p1Name = p1.value;
const p2Name = p2.value;


//GAME CODE
// a shortcut reference to each square of the game
let gameboard = Array(9);
for ( i = 0 ; i < 9 ; i++ ){
   gameboard[i] = document.getElementById(i);
}

let winner = 'none';


let turn = 0;
function play(n){
   // if that square has been played already or there is an overlay,
   // disregard any attempts to play there
   if(gameboard[n].classList.contains("dead") || game.classList.contains("game-blur")){
   
   } else {
      //if player1 plays display x
      if ( turn % 2  == 0 ){ 
      gameboard[n].innerHTML = 'X';
      }

      // if player 2  plays display o
      else{
      gameboard[n].innerHTML = 'O';
      }
   // check the status of the game after each play 
   winningCheck();

   // when the board is filled and still no winner, it is a draw
   if(turn == 8){draw()}
   
   // update the turn
   turn += 1;
   // to show the square has already been played on   
   gameboard[n].classList.add("dead");   
   //prompt NEXT PLAYER'S TURN
}
}

function  winningCheck(){
   // create an array of arrays
   let M = Array(3)
   for ( i = 0 ; i < 3 ; i++){
      M[i] = Array(3);
   }

    M[0] = [gameboard[0],gameboard[1],gameboard[2]];
    M[1] = [gameboard[3],gameboard[4],gameboard[5]];
    M[2] = [gameboard[6],gameboard[7],gameboard[8]];


   for ( i = 0 ; i < 3 ; i++ ){
      //if all the cells in the row are equal and have been played
         if( M[i][0].innerHTML === M[i][1].innerHTML && M[i][1].innerHTML === M[i][2].innerHTML && M[i][0].innerHTML != "" && M[i][1].innerHTML != "" && M[i][2].innerHTML != "" ){
            M[i][0].classList.add("winstreak");
            M[i][1].classList.add("winstreak");
            M[i][2].classList.add("winstreak");
            endGame();
         }
         // if all the cells in the column are equal and have been played on
         else if( M[0][i].innerHTML === M[1][i].innerHTML && M[1][i].innerHTML === M[2][i].innerHTML && M[0][i].innerHTML != "" && M[1][i].innerHTML != "" && M[2][i].innerHTML != "" ){
            M[0][i].classList.add("winstreak");
            M[1][i].classList.add("winstreak");
            M[2][i].classList.add("winstreak");
            endGame();            
         }
      }
      // if all the rows diagonally (both ways)
         if ( M[0][0].innerHTML === M[1][1].innerHTML && M[1][1].innerHTML === M[2][2].innerHTML && M[0][0].innerHTML != "" && M[1][1].innerHTML != "" && M[2][2].innerHTML != "" ){
            M[0][0].classList.add("winstreak");
            M[1][1].classList.add("winstreak");
            M[2][2].classList.add("winstreak");
            endGame();
         }

         else if ( M[0][2].innerHTML === M[1][1].innerHTML && M[1][1].innerHTML === M[2][0].innerHTML &&  M[0][2].innerHTML != "" && M[1][1].innerHTML != "" &&  M[2][0].innerHTML != "" ){
            M[0][2].classList.add("winstreak"); 
            M[1][1].classList.add("winstreak");
            M[2][0].classList.add("winstreak");
            endGame();
         }

}
// if there is a winner, end the game
function endGame(){
   optionsHide("true");
   // display the winner
   winnerOverlay.classList.add("open-modal");
   game.classList.add("game-blur");

   // check who the winner is based on who played last
   turn % 2 ? winner = p2.value : winner = p1.value;

   document.getElementById("winner-name1").innerHTML = winner;
   document.getElementById("winner-name2").innerHTML = winner;
}

// to change player names and play again
function newGame(){
   // re-enable the in-game options
   optionsHide("false");
   // hide the gameboard and victor messages
   if( drawOverlay.classList.contains("open-modal") ){
      drawOverlay.classList.remove("open-modal");
   }

   modalContainer.classList.remove("hide-cont");
   game.classList.remove("game-blur");
   game.classList.remove("visible");
   winnerOverlay.classList.remove("open-modal");
   regModal.classList.add("open-modal");

   // clear the former plyers names
   p1.value = "";
   p2.value = "";
   // clear the gameboard
   clearBoard();
}

// prompted message asking whether to quit
function verify(){
   // disable the in-game options
   optionsHide("true");
   // if it occured at the end of the game, do nothing
   if( drawOverlay.classList.contains("open-modal") || winnerOverlay.classList.contains("open-modal") ){
   }
   // otherwise show the verification prompt
   else{
      game.classList.add("game-blur");
      verifyOverlay.classList.add("open-modal");
   }

}
// if the game runs out of moves and ends in a draw
function draw(){
   // disable the in-game options
   optionsHide("true");
   if(!winnerOverlay.classList.contains("open-modal") ){
   drawOverlay.classList.add("open-modal");
   game.classList.add("game-blur");
   }
}

// if the game is to be played again
function playAgain(){
   // clear all the prompts from screen
   if( drawOverlay.classList.contains("open-modal") ){
      drawOverlay.classList.remove("open-modal");
   }

   if(winnerOverlay.classList.contains("open-modal") ){
      winnerOverlay.classList.remove("open-modal");
   }

   if(verifyOverlay.classList.contains("open-modal") ){
      verifyOverlay.classList.remove("open-modal");
   }

   // re-enable the in-game options
   optionsHide("false");
   game.classList.remove("game-blur");

   // reset the game board
   clearBoard();
      
}

function remove(){
   // re-enable the in-game options
   optionsHide("false");
   verifyOverlay.classList.remove("open-modal");
   game.classList.remove("game-blur");
}

// clear the game board
function clearBoard(){
   // delete all plays made
   for ( i = 0 ; i < 9 ; i++ ){
      gameboard[i].innerHTML = "";
      // re-activate the already played squares 
      if( gameboard[i].classList.contains("dead") ){
         gameboard[i].classList.remove("dead");
      }
      // remove the winstreaks
      if( gameboard[i].classList.contains("winstreak") ){
         gameboard[i].classList.remove("winstreak");
      }

   }
   // reset turns
   turn = 0; 
}

let optionsHide = function(bool){
   let j = eval(bool);
   if (j){
      document.getElementById("restart").style.display = "none";
      document.getElementById("re-register1").style.display = "none";
   } else {
      document.getElementById("restart").style.display = "block";
      document.getElementById("re-register1").style.display = "block";
   }
}






