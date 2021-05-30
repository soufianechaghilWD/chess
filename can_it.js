const letter_up = (letter, up) => {
    if(letter === "h" && up === 1) return null
    else if(letter === "a" && up === -1) return null
    else {
        let asci = letter.charCodeAt(0)
        if(String.fromCharCode(asci + up) > 'h' || String.fromCharCode(asci + up) < 'a') return null
        else return String.fromCharCode(asci + up)
    }
}

const pawn = (pos, who) => {
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

const rook = (pos, who) => {
    return true
}

const all_poss = (piece, pos) => {
    if(piece?.substring(0, piece?.length - 1) === "pawn"){
        return pawn(pos, piece?.split('')?.pop())
    }else if (piece?.substring(0, piece?.length - 1) === "rook"){
        return rook(pos, piece?.split('')?.pop())
    }
}

console.log(all_poss('pawnB', '7h'))

/*export const can_it = () => {

}*/
