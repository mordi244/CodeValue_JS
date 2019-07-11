/* Game Of Life Application */
/* ------------------------ */

// initialize global variables
var rows = 55;
var cols = 140;
//initialize 2dim arrays 
var arr;// current generation array
var nextArr; // next generation array
var mode = 0; //game current mode
var timeInMS = 40;
var timer;
//buttons selectors
var gridSize = document.getElementById("sizeId");
var rowsInput = document.getElementById("rowsId");
var colsInput = document.getElementById("colsId");
//container selector
var container = document.getElementById("container");

//this function remove the table - use this function berfore setting the new size
function remove() {
    var tb = document.querySelector("table");
    tb.outerHTML = "";
}

// listeners for setting the grid size
gridSize.addEventListener("change", function (e) {
    remove();
    if (this.value === "Small") {
        cols = 80;
        rows = 20;
    }
    else if (this.value === "Medium") {
        cols = 126;
        rows = 34;
    }
    else {
        cols = 140;
        rows = 55;
    }
    mode = 0;
    timer = 0;
    make2DArr();
    drawGrid();
});

//update the visual grid according to the states of the cell - live or dead.
function update() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = document.getElementById(i + "_" + j);

            if (arr[i][j] === 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

//copy generation 0 array to generation 1. current arr gets the values of next arr
function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            arr[i][j] = nextArr[i][j];
            nextArr[i][j] = 0;
        }
    }
}

//count number of neighbors for every cell - inputs are r - rows , c - columns
function countNeighbors(r, c) {

    let rstart = 0, cstart = 0, rend = rows - 1, cend = cols - 1;
    let count = 0;
    if (r - 1 > 0)
        rstart = r - 1;
    if (c - 1 > 0)
        cstart = c - 1;
    if (r + 1 <= rend)
        rend = r + 1;
    if (c + 1 <= cend)
        cend = c + 1;

    for (let i = rstart; i <= rend; i++) {
        for (let j = cstart; j <= cend; j++) {
            if (arr[i][j] === 1)
                count++;
        }
    }

    count -= arr[r][c];
    if (count < 0)
        count = 0;
    return count;
}


// calculate next 2dim array (generation 1) according to gameOfLife rules
function calculateNext() {
    let numOfLivesArr = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let currentMode = arr[i][j];
            if (currentMode === 1)
                numOfLivesArr++;
            let count = countNeighbors(i, j);
            if (currentMode === 0 && count === 3) {
                nextArr[i][j] = 1;
            }
            else if (currentMode === 1 && (count < 2 || count > 3)) {
                nextArr[i][j] = 0;
            }
            else {
                nextArr[i][j] = currentMode;
            }
        }
    }
    copyAndResetGrid();
}

//run game
function run() {
    calculateNext();
    update();
    timer = setTimeout(run, 50);
}

//populate the array with random values 0/1
function populateArr() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            arr[i][j] = Math.floor(Math.random() * 2);
            if (arr[i][j] === 1) {
                let cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
            }
            else {
                let cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "dead");

            }
        }
    }
}

//clear array - set 0 values for current and next generations arrays
function clear() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            arr[i][j] = 0;
            nextArr[i][j] = 0;
        }
    }
}

//setting event listeners for buttons that controlls the game
function buttonsControl() {
    var randomBtn = document.getElementById("randomBtnId");
    var startBtn = document.getElementById("startBtnId");
    var clearBtn = document.getElementById("clearBtnId");

    //event listener for fill the board randomly
    randomBtn.addEventListener("click", function () {
        clear();
        populateArr();
    });
    //event listener for start button - will start the game
    startBtn.addEventListener("click", function () {
        if (mode == 1) {
            mode = 2;
            startBtn.textContent = "Continue";
            clearTimeout(timer);
        }
        else if (mode == 0) {
            startBtn.textContent = "Pause";
            mode = 1;
            run();
        }
        else {
            startBtn.textContent = "Pause";
            mode = 1;
            run();
        }
    });
    //event listener for clearing the board
    clearBtn.addEventListener("click", function () {
        startBtn.textContent = "Start";
        clear();
        update();
        mode = 0;
    });
}

//draw table grid in the web page
function drawGrid() {
    let grid = document.getElementById("container");
    let table = document.createElement("table");
    table.setAttribute("class", "center");

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            tr.appendChild(cell);
            cell.addEventListener("click", function () {
                if (cell.classList.contains("live")) {
                    cell.setAttribute("class", "dead");
                    arr[i][j] = 0;
                }
                else
                    cell.setAttribute("class", "live");
                arr[i][j] = 1;
            });
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
}


//create 2 dim arrays - current and next generations.
function make2DArr() {
    arr = new Array(rows);
    nextArr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
        nextArr[i] = new Array(cols);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            arr[i][j] = 0;
            nextArr[i][j] = 0;
        }
    }
}

//initial game
function init() {
    make2DArr();
    drawGrid();
    buttonsControl();
}

//load init function
window.onload = init();