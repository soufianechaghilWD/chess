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
var last_click = null

var king_moved = {
    "W": false,
    "B": false
}

var rookLeft = {
    "W": false,
    "B": false
}
const set_You_Are_Playing = (who) => {
    if(who !== null){
        if(who === "B"){
            var ele1 = document.getElementById('W')
            if(ele1.childNodes.length > 1) ele1.removeChild(ele1.childNodes[1])
        }else{
            var ele1 = document.getElementById('B')
            if(ele1.childNodes.length > 1) ele1.removeChild(ele1.childNodes[1])
        }
        let ele = document.getElementById(who)
        var chi = document.createElement('p')
        chi.innerText = "Your Turn - - -"
        chi.classList.add('you_R_playing')
        ele.appendChild(chi)
    }
}

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

function move_a_piece_to_blank_pos (where, from) {
    var rm_ele = document.querySelector(`[data-cl = "${from.pos}"]`)
    rm_ele.removeChild(rm_ele.childNodes[0])
    var chil = document.createElement('img')
    chil.src = './files/'+from.piece+'.png'
    where.appendChild(chil)
}

function letter_up (letter, up) {
    if(letter === "h" && up === 1) return null
    else if(letter === "a" && up === -1) return null
    else {
        let asci = letter.charCodeAt(0)
        if(String.fromCharCode(asci + up) > 'h' || String.fromCharCode(asci + up) < 'a') return null
        else return String.fromCharCode(asci + up)
    }
}

function pawn (pos, who) {
    if(who === "W"){
        var res = [(parseInt(pos[0])+1)+pos[1]]
        if(letter_up(pos[1], 1) !== null) res.push((parseInt(pos[0])+1)+letter_up(pos[1], 1))
        if(letter_up(pos[1], -1) !== null) res.push((parseInt(pos[0])+1)+letter_up(pos[1], -1))        
        if(pos[0] === "2"){
            res.push(parseInt(pos[0])+2+pos[1])
        }
        return res
    }else{
        var res = [(parseInt(pos[0])-1)+pos[1]]
        if(letter_up(pos[1], 1) !== null) res.push((parseInt(pos[0])-1)+letter_up(pos[1], 1))
        if(letter_up(pos[1], -1) !== null) res.push((parseInt(pos[0])-1)+letter_up(pos[1], -1))
        if(pos[0] === "7"){
            res.push(parseInt(pos[0])-2+pos[1])
        }
        return res
    }
}

function rook (pos) {
    var res = []
    for(let i = parseInt(pos[0]) + 1; i <= 8; i++){
        res.push(i+pos[1])
    }
    for(let i = parseInt(pos[0]) - 1; i >= 1; i--){
        res.push(i+pos[1])
    }
    let j = letter_up(pos[1], 1)
    while(j <= "h" && j !== null){
        res.push(pos[0]+j)
        j = letter_up(j, 1)
    }
    let k = letter_up(pos[1], -1)
    while(k >= "a" && k !== null){
        res.push(pos[0]+k)
        k = letter_up(k, -1)
    }
    return res
}

function knight (pos) {
    var res = []
    if( parseInt(pos[0]) + 2 <= 8 && letter_up(pos[1], 1) !== null) res.push((parseInt(pos[0]) + 2) + letter_up(pos[1], 1))
    if(parseInt(pos[0]) + 1 <= 8 && letter_up(pos[1], 2) !== null) res.push((parseInt(pos[0]) + 1) + letter_up(pos[1], 2))
    if(parseInt(pos[0]) - 2 >= 1 && letter_up(pos[1], 1) !== null) res.push((parseInt(pos[0]) - 2) + letter_up(pos[1], 1))
    if(parseInt(pos[0]) - 1 >= 1 && letter_up(pos[1], 2) !== null) res.push((parseInt(pos[0]) - 1) + letter_up(pos[1], 2))
    if( parseInt(pos[0]) + 2 <= 8 && letter_up(pos[1], -1) !== null) res.push((parseInt(pos[0]) + 2) + letter_up(pos[1], -1))
    if(parseInt(pos[0]) + 1 <= 8 && letter_up(pos[1], -2) !== null) res.push((parseInt(pos[0]) + 1) + letter_up(pos[1], -2))
    if(parseInt(pos[0]) - 2 >= 1 && letter_up(pos[1], -1) !== null) res.push((parseInt(pos[0]) - 2) + letter_up(pos[1], -1))
    if(parseInt(pos[0]) - 1 >= 1 && letter_up(pos[1], -2) !== null) res.push((parseInt(pos[0]) - 1) + letter_up(pos[1], -2))
    return res
}

function bishop (pos) {
    var res = []
    let j = letter_up(pos[1], 1)
    let i = parseInt(pos[0]) + 1
    while(j <= "h" && i  <= 8 && i !== null && j !== null){
        res.push(i+j)
        j = letter_up(j, 1)
        i = parseInt(i) + 1
    }
    let j1 = letter_up(pos[1], -1)
    let i1 = parseInt(pos[0]) + 1
    while(j1 >= "a" && i1  <= 8 && i1 !== null && j1 !== null){
        res.push(i1+j1)
        j1 = letter_up(j1, -1)
        i1 = parseInt(i1) + 1
    }
    let j2 = letter_up(pos[1], 1)
    let i2 = parseInt(pos[0]) - 1
    while(j2 <= "h" && i2  >= 1 && i2 !== null && j2 !== null){
        res.push(i2+j2)
        j2 = letter_up(j2, 1)
        i2 = parseInt(i2) - 1
    }
    let j3 = letter_up(pos[1], -1)
    let i3 = parseInt(pos[0]) - 1
    while(j3 <= "h" && i3  >= 1 && i3 !== null && j3 !== null){
        res.push(i3+j3)
        j3 = letter_up(j3, -1)
        i3 = parseInt(i3) - 1
    }
    return res
}

function king (pos) {
    var res = []
    if(parseInt(pos[0]) + 1 <= 8) res.push((parseInt(pos[0]) + 1)+pos[1])
    if(parseInt(pos[0]) - 1 >= 1) res.push((parseInt(pos[0]) - 1)+pos[1])
    if(letter_up(pos[1], 1) <= "h") res.push(pos[0]+letter_up(pos[1], 1))
    if(letter_up(pos[1], -1) >= "a") res.push(pos[0]+letter_up(pos[1], -1))
    if(parseInt(pos[0]) + 1 <= 8 && letter_up(pos[1], 1) <= "h") res.push((parseInt(pos[0]) + 1)+letter_up(pos[1], 1))
    if(parseInt(pos[0]) + 1 <= 8 && letter_up(pos[1], -1) >= "a") res.push((parseInt(pos[0]) + 1)+letter_up(pos[1], -1))
    if(parseInt(pos[0]) - 1 >= 1 && letter_up(pos[1], 1) <= "h") res.push((parseInt(pos[0]) - 1)+ letter_up(pos[1], 1))
    if(parseInt(pos[0]) - 1 >= 1 && letter_up(pos[1], -1) >= "a") res.push((parseInt(pos[0]) - 1)+letter_up(pos[1], -1))
    if(pos[0] === "1" && pos[1] === "e" && king_moved.W === false && rookLeft.W === false) res.push(pos[0]+letter_up(pos[1], -2))
    if(pos[0] === "8" && pos[1] === "e" && king_moved.B === false && rookLeft.B === false) res.push(pos[0]+letter_up(pos[1], -2))
    return res
}

const all_poss = (piece, pos) => {
    // Get possible moves for every piece at a given position
    switch (piece?.substring(0, piece?.length - 1)){
        case "pawn":
            return pawn(pos, piece?.split('')?.pop())
        case "rook":
            return rook(pos)
        case "knight":
            return knight(pos)
        case "bishop":
            return bishop(pos)
        case "king": 
            return king(pos)
        case "queen":
            return rook(pos).concat(bishop(pos))
        default:
            return null
    }
}

const getBetween  = (where1, where2, type) => {
    var res = []
    if(type === "number"){
        if(where1[1] > where2[1]){
            let h = letter_up(where1[1], -1)
            while(h > where2[1] && h !== null){
                res.push(where1[0]+h)
                h = letter_up(h, -1)
            }
        }else{
            let h = letter_up(where1[1], 1)
            while(h < where2[1] && h !== null){
                res.push(where1[0]+h)
                h = letter_up(h, 1)
            }
        }
    }else if(type === "letter"){
        if(parseInt(where1[0]) > parseInt(where2[0])){
            let h = parseInt(where1[0]) - 1
            while(h > parseInt(where2[0]) && h !== null){
                res.push(h+where1[1])
                h = h - 1
            }
        }else{
            let h = parseInt(where1[0]) + 1
            while(h < parseInt(where2[0]) && h !== null){
                res.push(h+where1[1])
                h = h + 1
            }
        }
    }else{
        if(parseInt(where1[0]) > parseInt(where2[0])){
            if(where1[1] > where2[1]){
                let i = parseInt(where1[0]) - 1
                let j = letter_up(where1[1], -1)
                while(i > parseInt(where2[0]) && j > where2[1] && j !== null){
                    res.push(i+j)
                    i = parseInt(i) - 1
                    j = letter_up(j, -1)
                }
            }else{
                let i = parseInt(where1[0]) - 1
                let j = letter_up(where1[1], 1)
                while(i > parseInt(where2[0]) && j < where2[1] && j !== null){
                    res.push(i+j)
                    i = parseInt(i) - 1
                    j = letter_up(j, 1)
                }
            }
        }else{
            if(where1[1] > where2[1]){
                let i = parseInt(where1[0]) + 1
                let j = letter_up(where1[1], -1)
                while(i < parseInt(where2[0]) && j > where2[1] && j !== null){
                    res.push(i+j)
                    i = parseInt(i) + 1
                    j = letter_up(j, -1)
                }
            }else{
                let i = parseInt(where1[0]) + 1
                let j = letter_up(where1[1], 1)
                while(i < parseInt(where2[0]) && j < where2[1] && j !== null){
                    res.push(i+j)
                    i = parseInt(i) + 1
                    j = letter_up(j, 1)
                }
            }
        }
    }
    return res
}

const is_king_in_danger = (me, opponent) => {
    // Check if the king is under attack
    var king_pos = null
    for(let i = 0; i < Object.keys(me).length; i++){
        // Set the king position
        if(me[Object.keys(me)[i]]?.substring(0, me[Object.keys(me)[i]]?.length - 1) === "king") king_pos = Object.keys(me)[i]
    }
    for(let j = 0; j < Object.keys(opponent).length; j++){
        // Loop through the opponent pieces
        if(opponent[Object.keys(opponent)[j]].substring(0, opponent[Object.keys(opponent)[j]]?.length - 1) === "knight") {// if the piece is a knight check if it threatens the king 
            if(all_poss(opponent[Object.keys(opponent)[j]], Object.keys(opponent)[j]).some(x => x === king_pos)) return true
        }else if(opponent[Object.keys(opponent)[j]].substring(0, opponent[Object.keys(opponent)[j]]?.length - 1) === "pawn"){ // if the piece is a pawn
            var res = all_poss(opponent[Object.keys(opponent)[j]], Object.keys(opponent)[j]).filter(x => x[1] !== Object.keys(opponent)[j][1])
            if(res.some(x => x === king_pos)) return true
        }
        else{
            // check if other pieces threatning the king
            if(all_poss(opponent[Object.keys(opponent)[j]], Object.keys(opponent)[j]).some(x => king_pos === x)){ // check if the king is a possible native move for a piece
                if(Object.keys(opponent)[j][0] === king_pos[0]){ // check if the piece and the king have the same number in position
                    const inBetween = getBetween(Object.keys(opponent)[j], king_pos, "number")
                    // check if there's another piece in between the king and the threatening piece
                    if(!Object.keys(opponent)?.some(x => inBetween?.some(y => y === x)) && !Object.keys(me)?.some(x => inBetween?.some(y => y === x))) return true
                }else if (Object.keys(opponent)[j][1] === king_pos[1]){ // check if the piece and the king have the same letter in position
                    const inBetween = getBetween(Object.keys(opponent)[j], king_pos, "letter")
                    // check if there's another piece in between the king and the threatening piece
                    if(!Object.keys(opponent)?.some(x => inBetween?.some(y => y === x)) && !Object.keys(me)?.some(x => inBetween?.some(y => y === x))) return true
                }else{
                    const inBetween = getBetween(Object.keys(opponent)[j], king_pos, "otherwise")
                    // check if there's another piece in between the king and the threatening piece
                    if(!Object.keys(opponent)?.some(x => inBetween?.some(y => y === x)) && !Object.keys(me)?.some(x => inBetween?.some(y => y === x))) return true
                }
            }
        }
    }
    return false
}

const can_it = (from, to, me, opponent) => {
    if(all_poss(from.piece, from.pos).some(x => x === to)){
        var me_prime = Object.assign({}, me)
        delete me_prime[`${from.pos}`]
        me_prime[`${to}`] = from.piece
        return !is_king_in_danger(me_prime, opponent)
    }

    return false
}

const can_it__full = (from, to, me, opponent) => {
    if(all_poss(from.piece, from.pos).some(x => x === to)){
        var me_prime = Object.assign({}, me)
        delete me_prime[`${from.pos}`]
        me_prime[`${to}`] = from.piece
        var opp_prime = Object.assign({}, opponent)
        delete opp_prime[`${to}`]        
        return !is_king_in_danger(me_prime, opp_prime)
    }

    return false
}


const selected = (where) => {
    if(where !== null){
        var ele = document.querySelector(`[data-cl = "${where}"]`)
        ele.classList.add('selected')
    }else{
        var all = document.querySelectorAll('.col')
        all.forEach(ele => ele.classList.remove('selected'))
    }
}



const check_road = (player1, player2, from, to) => {
    var road = []
    if(from[0] === to[0]) road = getBetween(from, to, "number")
    else if(from[1] === to[1]) road = getBetween(from, to, "letter")
    else road = getBetween(from, to, "otherwise")
    return (Object.keys(player1)?.some(x => road.some(y => y === x)) || Object.keys(player2)?.some(x => road.some(y => y === x)))
    
}


const move_a_piece_to_full_pos = (from, to) => {
    var rm_ele = document.querySelector(`[data-cl = "${from.pos}"]`)
    rm_ele.removeChild(rm_ele.childNodes[0])
    var chil = document.createElement('img')
    chil.src = './files/'+from.piece+'.png'
    var rm_to = document.querySelector(`[data-cl = "${to}"]`)
    rm_to.removeChild(rm_to.childNodes[0])
    rm_to.appendChild(chil)
}

const add_to_score_list = (piece, who) => {
    var ele = document.getElementById(`score_${who}`)
    var chi = document.createElement('img')
    chi.src = "./files/"+piece+".png"
    ele.appendChild(chi)
}


const in_danger = (who) => {
    var where = null
    for(let i = 0; i < Object.keys(who).length; i++){
        if(who[Object.keys(who)[i]]?.substring(0, who[Object.keys(who)[i]]?.length - 1) === "king"){
            where = Object.keys(who)[i]
        }
    }
    var ele = document.querySelector(`[data-cl = "${where}"]`)
    ele.classList.add('king_in_danger')
}


const remove_danger = () => {
    var eles = document.querySelectorAll('.col')
    eles.forEach(ele => ele.classList.remove('king_in_danger'))
}

const get_king_pos = (ele) => {
    var pos = null
    for(let i = 0; i < Object.keys(ele).length; i++){
        if(ele[Object.keys(ele)[i]].substring(0, ele[Object.keys(ele)[i]].length - 1) === "king") pos = Object.keys(ele)[i]
    }
    return pos
}

const check_win = (in_danger, offenser) => {
    for(let i = 0; i < Object.keys(in_danger).length; i++){
        var pos = Object.keys(in_danger)[i]
        var piece = in_danger[Object.keys(in_danger)[i]]
        var poss = all_poss(piece, pos)
        for(let j = 0; j <poss.length; j++){
            if(Object.keys(offenser).some(x => x === poss[j])){
                if(can_it__full({piece: piece, pos: pos}, poss[j], in_danger, offenser)) {
                    if(check_road(in_danger, offenser, pos, poss[j], piece) === false) {
                        if(piece.substring(0, piece?.length - 1) !== "pawn") return false
                        else{
                            if(poss[j][0] !== pos[0] && poss[j][1] !== pos[1]) {
                                return false
                            }
                        }
                    }
                    
                }
            }
            if(!Object.keys(offenser).some(x => x === poss[j]) && !Object.keys(in_danger).some(x => x === poss[j])){
                if(can_it({piece: piece, pos: pos}, poss[j], in_danger, offenser)) {
                    if(check_road(in_danger, offenser, pos, poss[j], piece) === false) {
                        if(piece.substring(0, piece?.length - 1) !== "pawn") return false
                        else{
                            if(poss[j][1] === pos[1]) {
                                return false
                            }
                        }
                    }
                    
                }
            }
        }
    }
    return true
}

const win_Detected = (winner) => {
    if(winner === "W"){
        alert('The whites Won')
    }else{
        alert('The Blacks Won')
    }
    playerB = {
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
    playerW = {
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
    start_game = false
    turn = null
    last_click = null
    var eles = document.querySelectorAll('.col')
    eles.forEach(ele => {
        ele.innerHTML = ""
        ele.classList.remove('king_in_danger', "selected")
    }) 
    var score_B = document.getElementById('score_B')
    score_B.innerHTML = ""
    var score_W = document.getElementById('score_W')
    score_W.innerHTML = ""
    var eles_1 = document.querySelectorAll('.tt')
    eles_1.forEach(ele => ele.innerHTML = "")
    setPlayers()
}

const move_piece = (turn, last_click, playerB, playerW, ele, full, castling) => {
    if(turn === "W") {
        delete playerW[`${last_click.pos}`]
        playerW[`${get_the_position(ele)}`] = last_click.piece
        if(full) delete playerB[`${get_the_position(ele)}`]
        turn = "B"
        // check if the opponent's king in danger
        if(is_king_in_danger(playerB, playerW)){
            in_danger(playerB)
            if(check_win(playerB, playerW)){
                win_Detected('W')
            }
        }else{
            remove_danger()
        }
        
    }
    else {
        delete playerB[`${last_click.pos}`]
        playerB[`${get_the_position(ele)}`] = last_click.piece
        if(full) delete playerW[`${get_the_position(ele)}`]
        turn = "W"
        // check if the opponent's king in danger
        if(is_king_in_danger(playerW, playerB)){
            in_danger(playerW)
            if(check_win(playerW, playerB)){
                win_Detected('B')
            }
        }else{
            remove_danger()
        }
        
    }
    if(!castling) set_You_Are_Playing(turn)
    selected(null)
}

const newPlayers = (playerW, playerB, turn) => {
    var me = null
    var opponent = null
    if(turn === "W"){
        me = Object.assign({}, playerW)
        opponent = Object.assign({}, playerB)
    }else{
        me = Object.assign({}, playerB)
        opponent = Object.assign({}, playerW)
    }
    return [me, opponent]
}


const makeAmove = (ele) => {
    // check if the game is on and if the user's turn and if position is the users's
    // if((turn === get_the_user_from_the_ele(ele) || last_click !== null) && start_game){
        if((turn === get_the_user_from_the_ele(ele) || last_click !== null ) && start_game){
            // check if its the first click or not
        if(last_click === null){
            last_click = {
                "pos" : get_the_position(ele),
                "piece" : get_the_piece(ele)
            }
            selected(last_click.pos)
            // select__Poss(all_poss(last_click.piece, last_click.pos), last_click.piece)
        }else{
            // Check if the new position is blank or not(the user is going to take the opponent's piece)
            if(ele?.childNodes?.length === 0){
                if(!check_road(playerW, playerB, last_click.pos, get_the_position(ele))){
                    // Need to check if the piece can make the move and the king isn't in danger
                var me = newPlayers(playerW, playerB, turn)[0]
                var opponent = newPlayers(playerW, playerB, turn)[1]
                if(can_it(last_click, get_the_position(ele), me, opponent)){
                    if(last_click?.piece?.substring(0, last_click?.piece?.length - 1) === "pawn"){//check if the piece that's being moved is a pawn to prevent to move aside
                        if(all_poss(last_click.piece, last_click.pos).filter(x => x[1] === last_click.pos[1]).some(x => x === get_the_position(ele))){//check if the pawn can make the move
                            if(get_the_position(ele)[0] === "1" || get_the_position(ele)[0] === "8"){// need to check if the pawn reaches the other part
                                var asked_piece = null
                                while(asked_piece !== "q" && asked_piece !== "Q" && asked_piece !== "r" && asked_piece !== "R" && asked_piece !== "k" && asked_piece !== "K" && asked_piece !== "b" && asked_piece !== "B"){
                                    asked_piece = prompt('which piece do you need\nFor queen type: "q" or "Q"\nFor rook type: "r" or "R"\nFor Knight type: "k" or "K"\nFor bishop type: "b" or "B"')
                                }
                                if(asked_piece === "q" || asked_piece === "Q"){
                                    var last = {pos: last_click.pos, piece: "queen"+turn}
                                    move_a_piece_to_blank_pos(ele, last)
                                    move_piece(turn, last, playerB, playerW, ele, false)
                                    if(turn === "W") turn = "B"
                                    else turn = "W"
                                    last_click = null
                                }
                                if(asked_piece === "r" || asked_piece === "R"){
                                    var last = {pos: last_click.pos, piece: "rook"+turn}
                                    move_a_piece_to_blank_pos(ele, last)
                                    move_piece(turn, last, playerB, playerW, ele, false)
                                    if(turn === "W") turn = "B"
                                    else turn = "W"
                                    last_click = null
                                }
                                if(asked_piece === "k" || asked_piece === "K"){
                                    var last = {pos: last_click.pos, piece: "knight"+turn}
                                    move_a_piece_to_blank_pos(ele, last)
                                    move_piece(turn, last, playerB, playerW, ele, false)
                                    if(turn === "W") turn = "B"
                                    else turn = "W"
                                    last_click = null
                                }
                                if(asked_piece === "b" || asked_piece === "B"){
                                    var last = {pos: last_click.pos, piece: "bishop"+turn}
                                    move_a_piece_to_blank_pos(ele, last)
                                    move_piece(turn, last, playerB, playerW, ele, false)
                                    if(turn === "W") turn = "B"
                                    else turn = "W"
                                    last_click = null
                                }
                            }else{
                                move_a_piece_to_blank_pos(ele, last_click)
                                move_piece(turn, last_click, playerB, playerW, ele, false)
                                if(turn === "W") turn = "B"
                                else turn = "W"
                                last_click = null
                            }
                        }
                    }else if(last_click?.piece?.substring(0, last_click?.piece?.length - 1) === "king"){// check the piece is the king
                        if(letter_up(last_click.pos[1], -2) === get_the_position(ele)[1]){//in case the player is trying to castle
                            var leftRook_pos = last_click.pos[0]+ letter_up(last_click.pos[1], -4)
                            if(!check_road(playerB, playerW, last_click.pos, leftRook_pos) && !is_king_in_danger(playerB, playerW) && !is_king_in_danger(playerW, playerB)){
                                var leftRook = document.querySelector(`[data-cl = "${leftRook_pos}"]`)
                                var leftrooktoPos = leftRook_pos[0]+letter_up(leftRook_pos[1], 3)
                                var leftrookto = document.querySelector(`[data-cl = "${leftrooktoPos}"]`)
                                move_a_piece_to_blank_pos(ele, last_click)
                                move_piece(turn, last_click, playerB, playerW, ele, false, true)
                                move_a_piece_to_blank_pos(leftrookto, {pos: leftRook_pos, piece: get_the_piece(leftRook)})
                                var piece = "rook"+turn
                                move_piece(turn, {pos: leftRook_pos, piece: piece}, playerB, playerW, leftrookto, false)
                                king_moved[`${turn}`] = true
                                rookLeft[`${turn}`] = true
                                if(turn === "W") turn = "B"
                                else turn = "W"
                                last_click = null
                            }
                        }else{// in case the king is making a normal move
                            move_a_piece_to_blank_pos(ele, last_click)
                            move_piece(turn, last_click, playerB, playerW, ele, false)
                            if(king_moved[`${turn}`] === false) king_moved[`${turn}`] = true
                            if(turn === "W") turn = "B"
                            else turn = "W"
                            last_click = null
                        }
                    }else if(last_click?.piece?.substring(0, last_click?.piece?.length - 1) === "rook"){
                        move_a_piece_to_blank_pos(ele, last_click)
                        move_piece(turn, last_click, playerB, playerW, ele, false)
                        if(last_click.pos[1] === "a" && rookLeft[`${turn}`] === false) rookLeft[`${turn}`] = true
                        if(turn === "W") turn = "B"
                        else turn = "W"
                        last_click = null
                    }else{
                        move_a_piece_to_blank_pos(ele, last_click)
                        move_piece(turn, last_click, playerB, playerW, ele, false)
                        if(turn === "W") turn = "B"
                        else turn = "W"
                        last_click = null
                    }
                }
                }
            }else if(get_the_user_from_the_ele(ele) === turn){
                last_click = {
                    "pos": get_the_position(ele),
                    "piece": get_the_piece(ele)
                }
                selected(null)
                selected(last_click.pos)
                // unselect__pos()
                // select__Poss(all_poss(last_click.piece, last_click.pos))
            }else{
                if(!check_road(playerW, playerB, last_click.pos, get_the_position(ele))){
                    if(last_click?.piece?.substring(0, last_click?.piece?.length - 1) === "pawn"){ // check if the piece is a pawn (because the pawn can't take a piece if it's in front of him)
                        if(all_poss(last_click?.piece, last_click.pos).filter(x => x[1] !== last_click?.pos[1]).some(x => x == get_the_position(ele))){
                            var me = newPlayers(playerW, playerB, turn)[0]
                            var opponent = newPlayers(playerW, playerB, turn)[1]
                            if(can_it__full(last_click, get_the_position(ele), me, opponent)){
                                if(get_the_position(ele)[0] === "1" || get_the_position(ele)[0] === "8"){// need to check if the pawn reaches the other part
                                    var asked_piece = null
                                    while(asked_piece !== "q" && asked_piece !== "Q" && asked_piece !== "r" && asked_piece !== "R" && asked_piece !== "k" && asked_piece !== "K" && asked_piece !== "b" && asked_piece !== "B"){
                                        asked_piece = prompt('which piece do you need\nFor queen type: "q" or "Q"\nFor rook type: "r" or "R"\nFor Knight type: "k" or "K"\nFor bishop type: "b" or "B"')
                                    }
                                    if(asked_piece === "q" || asked_piece === "Q"){
                                        var last = {pos: last_click.pos, piece: "queen"+turn}
                                        add_to_score_list(get_the_piece(ele), turn)
                                        move_a_piece_to_full_pos(last, get_the_position(ele))
                                        move_piece(turn, last, playerB, playerW, ele, true)
                                        if(turn === "W") turn = "B"
                                        else turn = "W"
                                        last_click = null
                                    }
                                    if(asked_piece === "r" || asked_piece === "R"){
                                        var last = {pos: last_click.pos, piece: "rook"+turn}
                                        add_to_score_list(get_the_piece(ele), turn)
                                        move_a_piece_to_full_pos(last, get_the_position(ele))
                                        move_piece(turn, last, playerB, playerW, ele, true)
                                        if(turn === "W") turn = "B"
                                        else turn = "W"
                                        last_click = null
                                    }
                                    if(asked_piece === "k" || asked_piece === "K"){
                                        var last = {pos: last_click.pos, piece: "knight"+turn}
                                        add_to_score_list(get_the_piece(ele), turn)
                                        move_a_piece_to_full_pos(last, get_the_position(ele))
                                        move_piece(turn, last, playerB, playerW, ele, true)
                                        if(turn === "W") turn = "B"
                                        else turn = "W"
                                        last_click = null
                                    }
                                    if(asked_piece === "b" || asked_piece === "B"){
                                        var last = {pos: last_click.pos, piece: "bishop"+turn}
                                        add_to_score_list(get_the_piece(ele), turn)
                                        move_a_piece_to_full_pos(last, get_the_position(ele))
                                        move_piece(turn, last, playerB, playerW, ele, true)
                                        if(turn === "W") turn = "B"
                                        else turn = "W"
                                        last_click = null
                                    }
                                }else{
                                    add_to_score_list(get_the_piece(ele), turn)
                                    move_a_piece_to_full_pos(last_click, get_the_position(ele))
                                    move_piece(turn, last_click, playerB, playerW, ele, true)
                                    if(turn === "W") turn = "B"
                                    else turn = "W"
                                    last_click = null
                                }
                            } 
                        }                     
                    }else if(last_click?.piece?.substring(0, last_click?.piece?.length - 1) === "rook"){
                        var me = newPlayers(playerW, playerB, turn)[0]
                        var opponent = newPlayers(playerW, playerB, turn)[1]
                        if(can_it__full(last_click, get_the_position(ele), me, opponent)){
                            add_to_score_list(get_the_piece(ele), turn)
                            move_a_piece_to_full_pos(last_click, get_the_position(ele))
                            move_piece(turn, last_click, playerB, playerW, ele, true)
                            if(last_click.pos[1] === "a" && rookLeft[`${turn}`] === false) rookLeft[`${turn}`] = true
                            if(turn === "W") turn = "B"
                            else turn = "W"
                            last_click = null
                        }
                    }else if(last_click?.piece?.substring(0, last_click?.piece?.length - 1) === "king"){
                        var me = newPlayers(playerW, playerB, turn)[0]
                        var opponent = newPlayers(playerW, playerB, turn)[1]
                        if(can_it__full(last_click, get_the_position(ele), me, opponent)){
                            add_to_score_list(get_the_piece(ele), turn)
                            move_a_piece_to_full_pos(last_click, get_the_position(ele))
                            move_piece(turn, last_click, playerB, playerW, ele, true)
                            if(last_click.pos[1] === "a" && king_moved[`${turn}`] === false) king_moved[`${turn}`] = true
                            if(turn === "W") turn = "B"
                            else turn = "W"
                            last_click = null
                        }
                    }else{
                        var me = newPlayers(playerW, playerB, turn)[0]
                        var opponent = newPlayers(playerW, playerB, turn)[1]
                        if(can_it__full(last_click, get_the_position(ele), me, opponent)){
                            add_to_score_list(get_the_piece(ele), turn)
                            move_a_piece_to_full_pos(last_click, get_the_position(ele))
                            move_piece(turn, last_click, playerB, playerW, ele, true)
                            if(turn === "W") turn = "B"
                            else turn = "W"
                            last_click = null
                        }
                    }
                }
            }
        }
    }
}