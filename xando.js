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


playModal.classList.add("open-modal");



function playGame(){
   playModal.classList.remove("open-modal");
   regModal.classList.add("open-modal");
}


function register(){
   const p1Name = p1.value;
   const p2Name = p2.value;

// if two names have been entered and are not the same name reveal game
    if( p1Name != "" && p2Name != ""){
      if(p1Name == p2Name){
         regErr.innerHTML = "You cannot enter the same Player Name"
      }
      else{
         regModal.classList.remove("open-modal");
         modalContainer.classList.add("hide-cont");
         game.classList.add("visible");
    }
   }


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

let gameboard = Array(9);
let winner = 'none';




for ( i = 0 ; i < 9 ; i++ ){
   gameboard[i] = document.getElementById(i);
}


// to avoid replacing already played if cell contains class of {already dead}then nothing

let turn = 0;
function play(n){
   if(gameboard[n].classList.contains("dead") || game.classList.contains("game-blur")){
   //if x p1 plays display x
   } else {
      if ( turn % 2  == 0 ){ 
      gameboard[n].innerHTML = 'X';
      }

      // if o plays display o
      else{
      gameboard[n].innerHTML = 'O';
      }
   // check the status of the game after each play 
   winningCheck();
   // if none of the requirements are satisfied continue game 
   
   if(turn > 7){draw();}

   turn += 1;
   // add a class of already dead to the cell to avoid overwriting former play
   
   
   gameboard[n].classList.add("dead");
   
   //prompt NEXT PLAYER'S TURN
}
}



function  winningCheck(){
   let M = Array(3)
   for ( i = 0 ; i < 3 ; i++){

      M[i] = Array(3);

   }

    M[0] = [gameboard[0],gameboard[1],gameboard[2]];
    M[1] = [gameboard[3],gameboard[4],gameboard[5]];
    M[2] = [gameboard[6],gameboard[7],gameboard[8]];


   for ( i = 0 ; i < 3 ; i++ ){

         //if all the cells in the row are equal and none of them are empty
         if( M[i][0].innerHTML === M[i][1].innerHTML && M[i][1].innerHTML === M[i][2].innerHTML && M[i][0].innerHTML != "" && M[i][1].innerHTML != "" && M[i][2].innerHTML != "" ){
            M[i][0].classList.add("winstreak");
            M[i][1].classList.add("winstreak");
            M[i][2].classList.add("winstreak");
            endGame();
         }

         else if( M[0][i].innerHTML === M[1][i].innerHTML && M[1][i].innerHTML === M[2][i].innerHTML && M[0][i].innerHTML != "" && M[1][i].innerHTML != "" && M[2][i].innerHTML != "" ){
            M[0][i].classList.add("winstreak");
            M[1][i].classList.add("winstreak");
            M[2][i].classList.add("winstreak");
            endGame();            
         }

      }

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

function endGame(){
   winnerOverlay.classList.add("open-modal");
   game.classList.add("game-blur");

   turn % 2 ? winner = p2.value : winner = p1.value;

   document.getElementById("winner-name1").innerHTML = winner;
   document.getElementById("winner-name2").innerHTML = winner;

}
function newGame(){
   if( drawOverlay.classList.contains("open-modal") ){
   drawOverlay.classList.remove("open-modal");
   }

   modalContainer.classList.remove("hide-cont");
   game.classList.remove("game-blur");
   game.classList.remove("visible");
   winnerOverlay.classList.remove("open-modal");
   regModal.classList.add("open-modal");

   p1.value = "";
   p2.value = "";

   clearBoard();

}

function verify(){

   if( drawOverlay.classList.contains("open-modal") || winnerOverlay.classList.contains("open-modal") ){}

else{
   game.classList.add("game-blur");
   verifyOverlay.classList.add("open-modal");
}

}

function draw(){
   if(!winnerOverlay.classList.contains("open-modal") ){
   drawOverlay.classList.add("open-modal");
   game.classList.add("game-blur");
   }
}

function playAgain(){

   if( drawOverlay.classList.contains("open-modal") ){
      drawOverlay.classList.remove("open-modal");
      }

   if(winnerOverlay.classList.contains("open-modal") ){
     winnerOverlay.classList.remove("open-modal");
      }

   if(verifyOverlay.classList.contains("open-modal") ){
     verifyOverlay.classList.remove("open-modal");
      }

      game.classList.remove("game-blur");

      clearBoard();
      
   }

function remove(){
   verifyOverlay.classList.remove("open-modal");
   game.classList.remove("game-blur");

}

function clearBoard(){
   for ( i = 0 ; i < 9 ; i++ ){
      gameboard[i].innerHTML = "";

      if( gameboard[i].classList.contains("dead") ){
         gameboard[i].classList.remove("dead");
      }

      if( gameboard[i].classList.contains("winstreak") ){
         gameboard[i].classList.remove("winstreak");
      }

   }  
   
   turn = 0; 
}






