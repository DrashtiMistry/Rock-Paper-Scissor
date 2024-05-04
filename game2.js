let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScorePara = document.querySelector("#my");
let compScorePara = document.querySelector("#comp");
let showWinMsg = document.querySelector(".showWin");
let winnerMsg = document.querySelector("#winner");
let resetButton = document.querySelector("#reset");
let newGameButton = document.querySelector("#newGame");
let printYourChoice = document.querySelector("#ych");
let printCompChoice = document.querySelector("#cch");

const resetTheGame = () => {
    enableChoices();
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "rgb(6, 6, 37)";
    msg.style.color = "bisque";
    showWinMsg.classList.add("hide");
    printYourChoice.innerText = "your choice";
    printCompChoice.innerText = "computer choice";
}

const genCompChoice = () => {
    const options = ["rock","paper","scissor"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawGame = () => {
    msg.innerText = "Game was draw! play again.";
    msg.style.backgroundColor = "rgb(2, 20, 48)";
}

const disableChoices = () => {
    for (let choice of choices) {
        choice.disabled = true ;
    }
}

const enableChoices = () => {
    for (let choice of choices) {
        // box.enabled = true ;
        choice.disabled = false ;
    }
}

const showMoveWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        
        msg.innerText = `You won this move! Your ${userChoice} beats the ${compChoice}`;
        msg.style.backgroundColor = "green";
     
        if(userScore===5){
            winnerMsg.innerText = "Congratulations! You won by 5 points.";
            showWinMsg.classList.remove("hide");
            disableChoices();
        }
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        
        msg.innerText = `You lose this move! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
      
        if(compScore===5){
            winnerMsg.innerText = "Oops! you lose! Computer won by 5 point.";
            showWinMsg.classList.remove("hide");
            disableChoices();
        }
    }
}

const playGame = (userChoice) => {
    
    //generate computer choice
    const compChoice = genCompChoice();
    
    printYourChoice.innerText = `${userChoice}`;
    printCompChoice.innerText = `${compChoice}`;

    if(compChoice===userChoice) {
        drawGame();
    } else {
        let userWin = true ;
        if(userChoice==="rock"){
            userWin = compChoice === "paper" ? false : true ;
        } else if(userChoice==="paper"){
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;            
        }
        showMoveWinner(userWin,userChoice,compChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetButton.addEventListener("click",resetTheGame);
newGameButton.addEventListener("click",resetTheGame);