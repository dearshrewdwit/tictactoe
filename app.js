import state from './state.js'

const currentPlayerSymbol = () => state.symbols[0]

export default function (element) {
  state.element = element

  drawBoard()
}

const drawBoard = () => {
  state.element.innerHTML = ''

  for (let i=0; i<state.cells.length; i++) {
    const cell = createCell(i)
    state.element.append(cell)
  }
}

const createCell = (index) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')

  if (state.cells[index]) {
    const symbol = document.createElement('p')
    symbol.innerText = state.cells[index]
    symbol.classList.add('symbol')
    cell.append(symbol)
  } else {
    cell.classList.add('available')
    cell.addEventListener('click', () => {
      state.symbols.reverse()
      const symbol = currentPlayerSymbol()
      cell.classList.remove('available')
      state.cells[index] = symbol
      drawBoard()
      checkGameState()
    })
  }

  return cell
}

const checkGameState = () => {
  if (gameIsWon()) {
    drawBanner(`${currentPlayerSymbol()} won!`)
  } else if (gameIsDrawn()){
    drawBanner('Draw!')
  }
}

const gameIsWon = () => {
  return state.combinations.some(combo => {
    const cells = combo.map(index => state.cells[index])
    // all symbols are the same (and not null)
    return !(cells.includes(null)) && (new Set(cells)).size === 1
  })
}

const gameIsDrawn = () => state.cells.every(cell => cell !== null)

const drawBanner = (text) => {
  const banner = document.createElement('div')
  banner.classList.add('banner')
  const h1 = document.createElement('h1')
  h1.innerText = text
  banner.append(h1)
  state.element.append(banner)
}
