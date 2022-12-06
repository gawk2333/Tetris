import _ from 'lodash'

const shapes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']

const createActiveCellSpot = () => {
  const getRandomColor = () => {
    return `rgb(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`
  }
  const newActiveCellSpot = {
    rowIndex: 0,
    colIndex: parseInt(Math.random() * 4 + 4), // colIndex needs to be between 3 to 7
    color: getRandomColor(),
    border: `2px inset ${getRandomColor()}`,
    active: true,
    hasDroped: false
  }
  return newActiveCellSpot
}

// topleft    top    topup
// left              right
// bottomleft bottom bottomright
const createOtherCellSpots = (centerSpot, newSpotPosition) => {
  const newSpot = _.cloneDeep(centerSpot)
  switch (newSpotPosition) {
    default:
      return
    case 'topleft':
      newSpot.rowIndex -= 1
      newSpot.colIndex -= 1
      break
    case 'top':
      newSpot.rowIndex -= 1
      break
    case 'topright':
      newSpot.rowIndex -= 1
      newSpot.colIndex += 1
      break
    case 'left':
      newSpot.colIndex -= 1
      break
    case 'right':
      newSpot.colIndex += 1
      break
    case 'bottomleft':
      newSpot.rowIndex += 1
      newSpot.colIndex -= 1
      break
    case 'bottom':
      newSpot.rowIndex += 1
      break
    case 'bottomright':
      newSpot.rowIndex += 1
      newSpot.colIndex += 1
      break
    case 'toptop':
      newSpot.rowIndex -= 2
      break
  }
  return newSpot
}

const createCellSpotsArray = (spot, positions, shape) => {
  const cellSpotsArray = positions.map(position => createOtherCellSpots(spot, position))
  spot.shape = shape
  cellSpotsArray.push(spot)
  return cellSpotsArray
}

const createActiveObject = () => {
  const spot = createActiveCellSpot()
  const shape = shapes[parseInt(Math.random() * 6)]
  let positions
  switch (shape) {
    default:
      return
    case 'I':
      positions = ['toptop', 'top', 'bottom']
      break
    case 'J':
      positions = ['top', 'bottom', 'bottomleft']
      break
    case 'L':
      positions = ['top', 'bottom', 'bottomright']
      break
    case 'O':
      positions = ['top', 'topright', 'right']
      break
    case 'S':
      positions = ['top', 'topright', 'left']
      break
    case 'T':
      positions = ['left', 'top', 'right']
      break
    case 'Z':
      positions = ['topleft', 'top', 'right']
      break
  }
  return createCellSpotsArray(spot, positions, shape)
}

export default createActiveObject
