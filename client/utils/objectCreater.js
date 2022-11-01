const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'brown', 'green', 'grey', 'black', 'purple', 'red']

const createActiveCellSpot = () => {
  const newActiveCellSpot = {
    rowIndex: 1,
    colIndex: parseInt(Math.random() * 4 + 4), // colIndex needs to be between 3 to 7
    color: colors[parseInt(Math.random() * 10)],
    active: false,
    hasDroped: false
  }
  return newActiveCellSpot
}

export default createActiveCellSpot
