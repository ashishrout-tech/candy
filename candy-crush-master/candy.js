var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var turns = 20;

var currTile;
var otherTile;

window.addEventListener("load", function(){
    startGame();
    this.setInterval(function(){
        if(turns > 0){
            crushCandy();
            slideCandies();
            replaceCandies();
        }
        else{
            document.getElementById("turn").innerHTML = 0;
            alert(`Game Over  Score: ${score}`);
            score = 0;
            turns = 20;
            removeAll();
            board = [];
            startGame();
        }
    }, 100);
});

// window.onload = function(){
//     startGame();
// }

function removeAll(){
    let bd = document.getElementById("board")
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            bd.removeChild(board[i][j]);
        }
    }
    // console.log(bd);
}

rand = function(){
    return Math.floor(Math.random() * candies.length);
}

function startGame(){
    for(let i = 0; i < rows; i++){
        let row = [];
        for(let j = 0; j < columns; j++){
            //img
            let tile = document.createElement("img");
            tile.src = `./images/${candies[rand()]}.png`;
            tile.id = i.toString() + "-"+ j.toString();

            //Drag
            tile.draggable = true;
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);


            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart(){
    currTile = this;
}
function dragOver(event){
    event.preventDefault();
}

function dragEnter(event){
    event.preventDefault();
}

function dragLeave(){
    
}

function dragDrop(){
    otherTile = this;
}

function movement(){
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
}

function dragEnd(){
    let currCords = currTile.id.split("-");
    let otherCords = otherTile.id.split("-");
    let r1 = currCords[0] - '0', c1 = currCords[1] - '0';
    let r2 = otherCords[0] - '0', c2 = otherCords[1] - '0';

    if(c1 == c2){
        if(r1 == r2+1 || r1 == r2-1){
            movement();
            if(!checkValid()){
                movement();
            }
        }
    }
    if(r1 == r2){
        if(c1 == c2+1 || c1 == c2-1){
            movement();
            if(!checkValid()){
                movement();
            }
        }
    }
    
}

function checkValid(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            let candy1, candy2, candy3;
            if(c+1 < columns && c+2 < columns){
                candy1 = board[r][c];
                candy2 = board[r][c+1];
                candy3 = board[r][c+2];
                if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    turns--;
                    return true;
                }
            }
            if(r+1 < rows && r+2 < rows){
                candy1 = board[r][c];
                candy2 = board[r+1][c];
                candy3 = board[r+2][c];
                if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    turns--;
                    return true;
                }
            }
        }
    }
    return false;
}

function crushCandy(){
    //crushFive()
    //crushFour()
    crushThree();
    document.getElementById("score").innerText = score;
    document.getElementById("turn").innerHTML = turns;
}

function crushThree(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            let candy1, candy2, candy3;
            if(c+1 < columns && c+2 < columns){
                candy1 = board[r][c];
                candy2 = board[r][c+1];
                candy3 = board[r][c+2];
                if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    candy1.src = "./images/blank2.gif";
                    candy2.src = "./images/blank2.gif";
                    candy3.src = "./images/blank2.gif";
                    score += 10;
                }
            }
            if(r+1 < rows && r+2 < rows){
                candy1 = board[r][c];
                candy2 = board[r+1][c];
                candy3 = board[r+2][c];
                if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    candy1.src = "./images/blank2.gif";
                    candy2.src = "./images/blank2.gif";
                    candy3.src = "./images/blank2.gif";
                    score += 10;
                }
            }
        }
    }
}

function slideCandies(){
    for(let c = 0; c < columns; c++){
        for(let r = rows-1; r > 0; r--){
            if(board[r][c].src.includes("blank")){
                let flag = false;
                for(let u = r-1; u >= 0; u--){
                    if(!board[u][c].src.includes("blank")){
                        [board[u][c].src, board[r][c].src] = [board[r][c].src, board[u][c].src]; //swap
                        flag = true;
                        break;
                    }
                }
                if(!flag) break;
            }
        }
    }
}

function replaceCandies(){
    for(let c = 0; c < columns; c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src = `./images/${candies[rand()]}.png`;
        }
    }
}