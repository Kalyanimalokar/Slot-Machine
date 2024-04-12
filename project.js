// deposit money
// determin the number of slot lines to bet
// collect the bet amount from user.
// spin the slot machine.
// check if the user won.
// give the user their winings.
// give option to play agian.

// step 1. collect deposit money from user

// function deposit() { can write the funvtion this way.
//     return 1
// }

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
}

const SYMBOL_VALUE = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}


const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const amount = parseFloat(depositAmount);

        if (isNaN(amount) || amount <= 0) {
            console.log("Invalid deposit amount, try agian!")
        }else {
            return amount
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the Number of Lines to Place your bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try agian!")
        }else {
            return numberOfLines;
        }
    }
};

const getBet = (balence, lines) => {
    while (true) {
        const bet = prompt("Enter the Total betting amount per line: ");
        const betAmount = parseFloat(bet);

        if (isNaN(betAmount) || betAmount <= 0) {
            console.log("Invalid bet, try agian!")  
        }else {
            console.log(`You are betting $${betAmount*lines} in this game`)
            return betAmount;
        }
    }
}

const spin = () => {
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOL_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length -1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};


const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row =0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUE[symbols[0]];
        }
    }
    return winnings;
}

const game = () => {
    let balence = deposit(); 

    while(true){
        console.log("You have a balence of $" + balence);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balence, numberOfLines);
        if (numberOfLines*bet > balence) {
            console.log("Not enough money Play!");
            break;
        }
        balence -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        // console.log(reels);
        // console.log(rows);
        printRows(rows);
        const winnings =getWinnings(rows, bet, numberOfLines);
        balence += winnings;
        console.log("You won, $" + winnings.toString());

        if (balence <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?")
        if (playAgain != "y") break;
    }
    
};

game();



