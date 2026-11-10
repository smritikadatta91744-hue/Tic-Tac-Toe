const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");
const drawScore = document.getElementById("draw-score");

const playAgainBtn = document.getElementById("play-again");
const resetBtn = document.getElementById("reset");

let board=["", "", "", "", "", "", "", "", ""];
let current = "X";
let gameOver = false;

let score = {X:0 ,O:0 ,D:0 };

const winPattern=[
    [0,1,2],[3,4,5],[6,7,8],[0,4,8],
    [2,4,6],[0,3,6],[1,4,7],[2,5,8]
];
cells.forEach(cell => {
    cell.addEventListener("click", () => {
    const index= cell.getAttribute("data-i");

    if (board[index] !=="" || gameOver) return;

    board[index] = current;
    cell.textContent = current;
    cell.classList.add(current.toLowerCase());

    checkWinner();

    if (!gameOver) {
        current = current === "X" ? "O" : "X";
        statusText.textContent ="Player " + current + " Turn";
    }
});
});
function checkWinner() {
    for (let pattern of winPattern) {
    let [a , b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        statusText.textContent = "Player " + board[a] + " Wins!";
        gameOver = true
        score[board[a]]++;
        updateScore();

        // setTimeout(() => {
        //     if (confirm("Player " + board[a] + " Wins! \nPlay Again?")) {
        //         resetGame();
        //     }
        // }, 200);
        return;
    }
}
if (!board.includes("")) {
    statusText.textContent = "Draw!";
    gameOver =true;

    score.D++;
    updateScore();

    // setTimeout(() => {
    //     if (confirm("It's a Draw! \nPlay Again?")) {
    //         resetGame();
    //     }
    // },200);
    
}
}
function updateScore() {
    xScore.textContent =score.X;
    oScore.textContent =score.O;
    drawScore.textContent =score.D;
}
// resetBtn.addEventListener("click", () => {
//     board =["", "", "", "", "", "", "", "", ""];
//     gameOver = false;
//     current = "X";
//     cells.forEach(cell => {
//     cell.textContent ="";
//     cell.classList.remove("x","o");
// });

// });
function resetBoard() {
    board =["", "", "", "", "", "", "", "", ""];
    gameOver =false;
    current = "X";
    cells.forEach(cell => {
        cell.textContent ="";
        cell.classList.remove("x", "o");
    });
statusText.textContent ="Player X Turn";
}
playAgainBtn.addEventListener("click" , () => {
    resetBoard();
});
resetBtn.addEventListener("click" , () => {
    resetBoard();
    score = {X: 0, O: 0, D: 0};
    updateScore();
});