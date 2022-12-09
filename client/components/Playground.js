import React, { useCallback, useEffect, useState } from 'react'
import createActiveObject from '../utils/objectCreater'
import Cover from './Cover'
import _ from 'lodash'

const rowNumber = 12
const colNumber = 10
const activeCellSpots = createActiveObject()

export default function Playground ({
  gameState,
  setGameState,
  score,
  setScore,
  getKeyCode,
  keyPressNumber,
  gameTime,
  setGameTime
}) {
  const [cells, setCells] = useState([])
  const [activeObject, setActiveObject] = useState(activeCellSpots)

  const moveObject = (objectCells, rowfix, colfix) => {
    const objectCopy = _.cloneDeep(objectCells)
    // clearTimeout(gameInterval)
    const movedObject = objectCopy.map(cell => {
      cell.rowIndex += rowfix
      cell.colIndex += colfix
      return cell
    })
    setActiveObject(movedObject)
  }

  const rotateObject = () => {
    const centerSpot = _.last(activeObject)
    if (centerSpot.shape === 'O') {
      return activeObject
    }
    const rotatedCells = activeObject.map(eachCell => {
      const eachCellCopy = _.cloneDeep(eachCell)
      if (eachCell.rowIndex !== centerSpot.rowIndex && eachCell.colIndex === centerSpot.colIndex) {
        eachCellCopy.rowIndex = centerSpot.rowIndex
        eachCellCopy.colIndex = centerSpot.colIndex + (eachCell.rowIndex - centerSpot.rowIndex)
      } else if (eachCell.rowIndex === centerSpot.rowIndex && eachCell.colIndex !== centerSpot.colIndex) {
        eachCellCopy.colIndex = centerSpot.colIndex
        eachCellCopy.rowIndex = centerSpot.rowIndex - (eachCell.colIndex - centerSpot.colIndex)
      } else if ((eachCell.rowIndex > centerSpot.rowIndex && eachCell.colIndex > centerSpot.colIndex) ||
      (eachCell.rowIndex < centerSpot.rowIndex && eachCell.colIndex < centerSpot.colIndex)) {
        eachCellCopy.rowIndex = centerSpot.rowIndex - (eachCell.rowIndex - centerSpot.rowIndex)
      } else if ((eachCell.rowIndex > centerSpot.rowIndex && eachCell.colIndex < centerSpot.colIndex) ||
      (eachCell.rowIndex < centerSpot.rowIndex && eachCell.colIndex > centerSpot.colIndex)) {
        eachCellCopy.colIndex = centerSpot.colIndex - (eachCell.colIndex - centerSpot.colIndex)
      }
      return eachCellCopy
    })
    const results = rotatedCells.map(eachRotatedCell => {
      const [nextCell] = cells.filter(cell => cell.rowIndex === eachRotatedCell.rowIndex && cell.colIndex === eachRotatedCell.colIndex)
      if (!nextCell) { return false }
      if (nextCell && nextCell.hasDroped) {
        return false
      }
      if (eachRotatedCell.colIndex < 0) { return false }
      return true
    })
    if (results.some(result => result === false)) {
      console.log('stop')
    } else {
      setActiveObject(rotatedCells)
    }
  }

  // initialize
  const createCells = () => {
    const currentCells = []
    for (let i = 1; i <= rowNumber; i++) {
      for (let j = 1; j <= colNumber; j++) {
        const newCell = {
          rowIndex: i,
          colIndex: j,
          active: false,
          hasDroped: false
        }
        currentCells.push(newCell)
      }
    }
    setCells(currentCells)
  }

  useEffect(() => {
    createCells()
  }, [])

  // keydown actions
  useEffect(() => {
    const onKeyCodeChanges = () => {
      const keyCode = getKeyCode()
      const newObject = _.cloneDeep(activeObject)
      let availableArr
      switch (keyCode) {
        default:
          break
        case 37:
          availableArr = newObject.map(eachCell => {
            return checkIfTheNextSpotAvailable(eachCell, 'left')
          })
          if (availableArr.some(result => result === false)) {
            console.log('stop')
          } else {
            moveObject(activeObject, 0, -1)
          }
          break
        case 38:
          rotateObject()
          break
        case 39:
          availableArr = newObject.map(eachCell => {
            return checkIfTheNextSpotAvailable(eachCell, 'right')
          })
          if (availableArr.some(result => result === false)) {
            console.log('stop')
          } else {
            moveObject(activeObject, 0, 1)
          }
          break
        case 40:
          availableArr = newObject.map(eachCell => {
            return checkIfTheNextSpotAvailable(eachCell, 'down')
          })
          if (availableArr.some(result => result === false)) {
            console.log('stop')
          } else {
            moveObject(activeObject, 1, 0)
          }
          break
      }
    }
    onKeyCodeChanges()
  }, [keyPressNumber])

  const checkClearableRows = useCallback(() => {
    const cellsCopy = _.cloneDeep(cells)
    const settledCells = cellsCopy.filter(cell => cell.hasDroped === true)
    let clearableRowNumber = 0
    for (let rowIndex = 1; rowIndex <= rowNumber; rowIndex++) {
      const eachRowCells = settledCells.filter(cell =>
        cell.rowIndex === rowIndex
      )
      if (eachRowCells.length === colNumber) {
        if (cellsCopy.some(cell => cell.rowIndex < rowIndex)) {
          const dropedCells = cellsCopy.map(cell => {
            if (cell.rowIndex < rowIndex) {
              cell.rowIndex++
            } else if (cell.rowIndex === rowIndex) {
              delete cell.color
              cell.rowIndex = 1
              cell.border = null
              cell.active = false
              cell.hasDroped = false
            }
            return cell
          })
          setCells(dropedCells.sort((a, b) => a.rowIndex - b.rowIndex ||
          a.colIndex - b.colIndex))
        }
        clearableRowNumber++
      }
    }

    if (clearableRowNumber !== 0) {
      setScore(score + clearableRowNumber * 100)
    }

    if (clearableRowNumber === 0) {
      setActiveObject(createActiveObject())
    }
  }, [cells])

  useEffect(() => {
    checkClearableRows()
  }, [checkClearableRows])

  // useEffect(() => {
  //   if (objectCreaterToggle) {
  //     setActiveObject(createActiveObject())
  //     setObjectCreaterToggle(false)
  //   }
  // }, [objectCreaterToggle])

  const checkIfTheNextSpotAvailable = (spot, direction) => {
    if (direction === 'down') {
      const nextSpot = {
        ...spot,
        rowIndex: spot.rowIndex + 1
      }
      const [nextCell] = cells.filter(cell => cell.rowIndex === nextSpot.rowIndex && cell.colIndex === nextSpot.colIndex)
      if (nextCell && nextCell.hasDroped) {
        return false
      }
      if (nextSpot.rowIndex > rowNumber) {
        return false
      }
      return true
    }
    if (direction === 'right') {
      const nextSpot = {
        ...spot,
        colIndex: spot.colIndex + 1
      }
      const [nextCell] = cells.filter(cell => cell.rowIndex === nextSpot.rowIndex && cell.colIndex === nextSpot.colIndex)
      // if (!nextCell) { return false }
      if (nextCell && nextCell.hasDroped) {
        return false
      }
      if (nextSpot.colIndex > colNumber) { return false }
      return true
    }
    if (direction === 'left') {
      const nextSpot = {
        ...spot,
        colIndex: spot.colIndex - 1
      }
      const [nextCell] = cells.filter(cell => cell.rowIndex === nextSpot.rowIndex && cell.colIndex === nextSpot.colIndex)
      // if (!nextCell) { return false }
      if (nextCell && nextCell.hasDroped) {
        return false
      }
      if (nextSpot.colIndex < 1) { return false }
      return true
    }
  }

  const settleCurrentObject = () => {
    const currentObject = activeObject.filter(objectCell =>
      cells.some(cell => cell.rowIndex === objectCell.rowIndex &&
        cell.colIndex === objectCell.colIndex))
      .map(cell => {
        cell.active = false
        cell.hasDroped = true
        return cell
      })

    if (currentObject.length < 4) {
      setGameState('game over')
    }

    const filteredCells = cells
      .filter(cell => !currentObject.some(objectcell =>
        objectcell.rowIndex === cell.rowIndex &&
        objectcell.colIndex === cell.colIndex))
    const combinedCells = filteredCells
      .concat(currentObject)
    setCells(combinedCells.sort((a, b) => a.rowIndex - b.rowIndex ||
    a.colIndex - b.colIndex))
  }

  const whenGameRunning = useCallback(() => {
    const availableArr = activeObject.map(eachCell => {
      return checkIfTheNextSpotAvailable(eachCell, 'down')
    })
    if (availableArr.some(result => result === false)) {
      settleCurrentObject()
    } else {
      const newActiveObject = activeObject.map(cell => {
        cell.rowIndex++
        return cell
      })
      setActiveObject(newActiveObject)
    }
  }, [activeObject, keyPressNumber])

  useEffect(() => {
    whenGameRunning()
  }, [gameTime])

  const blockStyle = (gameState === 'started' || gameState === 'ready') ? null : 'filter: grayscale(1)'

  return (<div className='playground'>
    <Cover
      gameState={gameState}
      setGameState={setGameState}
      createCells={createCells}
      setGameTime={setGameTime}
    />
    {cells.length && cells.map(cell => {
      if (activeObject.some(objcell => objcell.rowIndex === cell.rowIndex && objcell.colIndex === cell.colIndex)) {
        const [activeCell] = activeObject.filter(objcell => objcell.rowIndex === cell.rowIndex && objcell.colIndex === cell.colIndex)
        return (<div className='cell' style={{ backgroundColor: activeCell.color, border: activeCell.border, blockStyle }} key={`${cell.rowIndex}-${cell.colIndex}`}></div>)
      } else {
        return (<div className='cell' style={{ backgroundColor: cell.color, border: cell.border }} key={`${cell.rowIndex}-${cell.colIndex}`}></div>)
      }
    })}
  </div>)
}
