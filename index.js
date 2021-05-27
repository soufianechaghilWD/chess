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