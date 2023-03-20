/* CONSEGNA
 * Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
 * Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
 * nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
 * 
 * FLUSSO UTENTE
 * In seguito l'utente clicca su una cella:
 * Se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba la cella si colora di rosso e la partita termina.
 * Altrimenti la cella cliccata si colora di azzurro l'utente può continuare a cliccare sulle altre celle.
 * 
 * END GAME
 * La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
 * (ovvero quando ha rivelato tutte le celle che non sono bombe).
 * Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
 * 
 * BONUS:
 * Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
 * difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
 * difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
 * difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; */


const el_row = document.querySelector(".row");
const el_btnPlay = document.querySelector("#btn_play");
const el_difficulty = document.querySelector("#difficulty");

// ===== EVENT ======================================================= /
el_btnPlay.addEventListener("click", function () {
    /* Clicking on button play create the grid */
    /* Calculate numCell from the select button in DOM */
    let numCell = calculateNumCell(el_difficulty.value)

    /* Delete the previous grid to prevent the following ones from being added in cascade by clicking on play */
    el_row.innerHTML = "";

    createGrid(numCell);

    createCellBombs(numCell);
});

// ===== FUNCTION ==================================================== /
function calculateNumCell(difficulty) {
    /* This function allow to change the logic of calculate the number cell */
    return difficulty * difficulty;
}

function createGrid(numCell) {
    for (let i = 0; i < numCell; i++) {
        const el_cell = document.createElement("div");
        el_cell.classList.add("ms_cell", createClassCell(numCell))
        el_cell.value = i + 1;
        el_cell.onclick = clickCell;
        el_row.append(el_cell);
    }
}

function createClassCell(numCell) {
    return `ms_line_${Math.sqrt(numCell)}`;
}

function clickCell() {
    this.classList.toggle("bg-primary")
    console.log(this.value)
}
function createCellBombs(numCell) {
    const el_cell = document.querySelectorAll(".ms_cell");
    const bombIndex = generateRandomArray(16, 1, numCell);
    console.log(bombIndex);
    for (let i = 0; i < bombIndex.length; i++) {
        /* Use (bombIndex[i] - 1)  as index in el_cell[] to individuate the cell bomb 
         * when i = 0  --> bombIndex give the index of first bomb in the array bombIndex
         * when i = 15 --> bombIndex give the index of last bomb in the array bombIndex
         * cellBomb isn - t ordered */
        const cellBomb = el_cell[bombIndex[i] - 1];
        cellBomb.classList.add("ms_cell_bomb")
    }
    return document.querySelectorAll(".ms_cell_bomb");
}

function generateRandomArray(count, min, max) {
    /* Generate random Array without duplicate */
    const rands = [];
    while (rands.length < count) {
        const r = Math.floor((Math.random() * max) + min);
        /* Enter in the IF in the only case where r isn't already contained in the array */
        if (rands.indexOf(r) == -1) {
            /* push r in the arry, because r isn't contained in the array */
            rands.push(r);
        }
    }
    return rands;
}     