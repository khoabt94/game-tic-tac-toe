// Selectors
const cellList = document.getElementById('cellList')
const turn = document.getElementById('currentTurn')
const cells = [...document.querySelectorAll('.cell')]
const statusEl = document.getElementById('gameStatus')
const replayBtn = document.getElementById('replayGame')

// check Game status
const checkRow = obj => {
    if (obj[0] === obj[1] && obj[1] === obj[2] && obj[0] !== '') return { status: obj[0], winPositions: [0, 1, 2] }
    if (obj[3] === obj[4] && obj[4] === obj[5] && obj[3] !== '') return { status: obj[3], winPositions: [3, 4, 5] }
    if (obj[6] === obj[7] && obj[7] === obj[8] && obj[6] !== '') return { status: obj[6], winPositions: [6, 7, 8] }
    return false
}

const checkCol = obj => {
    if (obj[0] === obj[3] && obj[3] === obj[6] && obj[0] !== '') return { status: obj[0], winPositions: [0, 3, 6] }
    if (obj[1] === obj[4] && obj[4] === obj[7] && obj[1] !== '') return { status: obj[1], winPositions: [1, 4, 7] }
    if (obj[2] === obj[5] && obj[5] === obj[8] && obj[2] !== '') return { status: obj[2], winPositions: [2, 5, 8] }
    return false
}

const checkSkew = obj => {
    if (obj[0] === obj[4] && obj[4] === obj[8] && obj[0] !== '') return { status: obj[0], winPositions: [0, 4, 8] }
    if (obj[2] === obj[4] && obj[4] === obj[6] && obj[2] !== '') return { status: obj[2], winPositions: [2, 4, 6] }
    return false
}

const checkGameStatus = (arrValues) => {
    const objValues = {}
    arrValues.forEach((el, i) => objValues[i] = el)
    let flag

    flag = checkRow(objValues)
    if (flag) return flag

    flag = checkCol(objValues)
    if (flag) return flag

    flag = checkSkew(objValues)
    if (flag) return flag

    if (arrValues.indexOf('') === -1) return { status: 'ENDED', winPositions: [] }

    return { status: 'PLAYING', winPositions: [] }
}

// Add event click cell
const gameInit = () => {
    cellList.addEventListener('click', function cellClick(e) {
        let currentPlayer = turn.classList.contains('cross') ? 'cross' : 'circle'
        const target = e.target.closest('.cell')
        
        if (!target) return

        // Insert symbol to cell
        target.classList.add(currentPlayer)

        // Change turn
        turn.classList.remove(currentPlayer)
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross'
        turn.classList.add(currentPlayer)

        // Extract arrValues
        const arrValues = cells.map(el => {
            if (el.classList.contains('cross')) return 'X'
            if (el.classList.contains('circle')) return 'O'
            return ''
        })

        // Check Game status
        const gameStatus = checkGameStatus(arrValues)
        console.log(gameStatus)

        // Conditional update
        statusEl.textContent = gameStatus.status
        if (gameStatus.status !== 'PLAYING') {
            // highlight win cell
            gameStatus.winPositions.forEach(el => {
                cells[el].classList.add('win')
            })

            // Display replay button
            replayBtn.style.display = 'inline-block'

            // Remove event listner
            this.removeEventListener('click', cellClick)
        }

    })
}

// Add event click replay btn
replayBtn.addEventListener('click', e => {
    e.preventDefault()

    statusEl.textContent = 'LOADING'
    cells.forEach(el => {
        el.classList.remove('cross')
        el.classList.remove('circle')
        el.classList.remove('win')
    })
    if (turn.classList.contains('cross')) return
    turn.classList.remove('circle')
    turn.classList.add('cross')

    replayBtn.style.display = 'none'

    gameInit()
})

gameInit()



