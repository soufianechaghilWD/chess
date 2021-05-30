// import { can_it } from "./can_it"

var playerB = {
    "8a" : "rookB",
    "8b" : "knightB",
    "8c": "bishopB",
    "8d": "queenB",
    "8e": "kingB",
    "8f": "bishopB",
    "8g": "knightB",
    "8h": "rookB",
    "7a": "pawnB",
    "7b": "pawnB",
    "7c": "pawnB",
    "7d": "pawnB",
    "7e": "pawnB",
    "7f": "pawnB",
    "7g": "pawnB",
    "7h": "pawnB",
}
var playerW = {
    "1a" : "rookW",
    "1b" : "knightW",
    "1c": "bishopW",
    "1d": "queenW",
    "1e": "kingW",
    "1f": "bishopW",
    "1g": "knightW",
    "1h": "rookW",
    "2a": "pawnW",
    "2b": "pawnW",
    "2c": "pawnW",
    "2d": "pawnW",
    "2e": "pawnW",
    "2f": "pawnW",
    "2g": "pawnW",
    "2h": "pawnW",
}
var start_game = false
var turn = null

const set_You_Are_Playing = (who) => {
    if(who === "B"){
        var ele1 = document.getElementById('W')
        if(ele1.childNodes.length > 1) ele1.removeChild(ele1.childNodes[1])
    }else{
        var ele1 = document.getElementById('B')
        if(ele1.childNodes.length > 1) ele1.removeChild(ele1.childNodes[1])
    }
    let ele = document.getElementById(who)
    var chi = document.createElement('p')
    chi.innerText = "Your Turn"
    chi.classList.add('you_R_playing')
    ele.appendChild(chi)
}

/*const blackPlayed = (who) => {
    if(turn !== who){
        turn = who
        set_You_Are_Playing(turn)
    }
}*/

const startGame = () => {
    if(start_game === false) {
        start_game=true
        var score = document.querySelectorAll('.score')
        score.forEach(scoree => scoree.classList.add('score_show'))
        turn = "W"
        set_You_Are_Playing(turn)
    }
}

const setPlayers = () => {
    // Get all keys of object playerB 
    const playerB_Pos = Object.keys(playerB)
    // For each position add the right picture
    playerB_Pos.forEach(ele => {
        let elem = document.querySelector(`[data-cl = "${ele}"]`)
        var chi = document.createElement('img')
        chi.src = './files/'+playerB[ele]+'.png'
        elem.appendChild(chi)
    })
    // Get all keys of object playerW 
    const playerW_Pos = Object.keys(playerW)
    // For each position add the right picture
    playerW_Pos.forEach(ele => {
        let elem = document.querySelector(`[data-cl = "${ele}"]`)
        var chi = document.createElement('img')
        chi.src = './files/'+playerW[ele]+'.png'
        elem.appendChild(chi)
    })
}

function get_the_user_from_the_ele (ele) {
    // get B if the selected element is a black element and W if the selected element is white
    return ele?.childNodes[0]?.getAttribute('src').split('/')[ele?.childNodes[0]?.getAttribute('src')?.split('/')?.length - 1]?.split('.')[0]?.split('')?.pop()
}

function get_the_piece (ele) {
    // get the piece's type
    return ele?.childNodes[0]?.getAttribute('src').split('/')[ele?.childNodes[0]?.getAttribute('src')?.split('/')?.length - 1]?.split('.')[0]
}

function get_the_position (ele) {
    // get the position of the ele
    return ele?.getAttribute('data-cl')
}

// var first_click = false
// var second_click = false
var last_click = null

function move_a_piece_to_blank_pos (where, from) {
    console.log(from)
    var rm_ele = document.querySelector(`[data-cl = "${from.pos}"]`)
    rm_ele.removeChild(rm_ele.childNodes[0])
    var chil = document.createElement('img')
    chil.src = './files/'+from.piece+'.png'
    where.appendChild(chil)
}

const makeAmove = (ele) => {
    // check if the game is on and if the user's turn and if position is the users's
    if((turn === get_the_user_from_the_ele(ele) || last_click !== null) && start_game){
        // check if its the first click or not
        if(last_click === null){
            last_click = {
                "pos" : get_the_position(ele),
                "piece" : get_the_piece(ele)
            }
        }else{
            // Check if the new position is blank or not(the user is going to take the opponent's piece)
            if(ele?.childNodes?.length === 0){
                // Need to check if the piece can make the move and the king isn't in danger
                /*if(can_it(playerB, playerW, ele, last_click)){

                }*/
                move_a_piece_to_blank_pos(ele, last_click)
            }
        }
    }
}