import React, { useCallback, useEffect, useState } from 'react'
import createActiveObject from '../utils/objectCreater'
import _ from 'lodash'

const rowNumber = 12
const colNumber = 10
let gameInterval
const activeCellSpots = createActiveObject()

export default function Playground ({ gameState, setGameState, getKeyCode, keyPressNumber }) {
  const [cells, setCells] = useState([])
  const [activeObject, setActiveObject] = useState(activeCellSpots)

  const moveObject = (objectCells, rowfix, colfix) => {
    const objectCopy = _.cloneDeep(objectCells)
    clearTimeout(gameInterval)
    const movedObject = objectCopy.map(cell => {
      cell.rowIndex += rowfix
      cell.colIndex += colfix
      return cell
    })
    setActiveObject(movedObject)
  }

  const rotateObject = () => {
    const centerSpot = _.last(activeObject)
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
      clearTimeout(gameInterval)
    }
  }

  // initialize
  useEffect(() => {
    const createCells = () => {
      const currentCells = []
      for (let i = 1; i <= rowNumber; i++) {
        for (let j = 1; j <= colNumber; j++) {
          const newCell = {
            rowIndex: i,
            colIndex: j,
            color: 'white',
            active: false,
            hasDroped: false
          }
          currentCells.push(newCell)
        }
      }
      setCells(currentCells)
    }
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
          // console.log('new', availableArr)
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
          // console.log('new', availableArr)
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
          // console.log('new', availableArr)
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
              cell.rowIndex = 1
              cell.color = 'white'
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
    if (clearableRowNumber === 0) {
      setActiveObject(createActiveObject())
      console.log('create')
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
      // console.log('next down', nextCell)
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
      cells.some(cell => cell.rowIndex === objectCell.rowIndex && cell.colIndex === objectCell.colIndex))
      .map(cell => {
        cell.active = false
        cell.hasDroped = true
        return cell
      })

    if (currentObject.length < 4) {
      setGameState('game over')
    }

    const filteredCells = cells
      .filter(cell => !currentObject.some(objectcell => objectcell.rowIndex === cell.rowIndex && objectcell.colIndex === cell.colIndex))
    // console.log('filtered1', filteredCells)
    const combinedCells = filteredCells
      .concat(currentObject)
    // console.log('filtered2', filteredCells)
    setCells(combinedCells.sort((a, b) => a.rowIndex - b.rowIndex ||
    a.colIndex - b.colIndex))
  }

  const whenGameRunning = useCallback(() => {
    const availableArr = activeObject.map(eachCell => {
      return checkIfTheNextSpotAvailable(eachCell, 'down')
    })
    if (availableArr.some(result => result === false)) {
      clearTimeout(gameInterval)
      settleCurrentObject()
    } else {
      const newActiveObject = activeObject.map(cell => {
        cell.rowIndex++
        return cell
      })
      clearTimeout(gameInterval)
      setActiveObject(newActiveObject)
    }
  }, [activeObject])

  const onGameStart = useCallback(() => {
    gameInterval = setTimeout(() => {
      whenGameRunning()
    }, 1000)
  }, [gameState, whenGameRunning])

  const onGameStop = useCallback(() => {
    // const newObject = _.cloneDeep(activeObject)
    // const pausedObject = newObject.map(spot => {
    //   spot.active = false
    //   clearTimeout(gameInterval)
    // })
  }, [gameState])

  useEffect(() => {
    if (gameState === 'started') {
      onGameStart()
    } else {
      onGameStop()
    }
  }, [onGameStart, onGameStop])

  return (<div className='playground'>
    {cells.length && cells.map(cell => {
      if (activeObject.some(objcell => objcell.rowIndex === cell.rowIndex && objcell.colIndex === cell.colIndex)) {
        const [activeCell] = activeObject.filter(objcell => objcell.rowIndex === cell.rowIndex && objcell.colIndex === cell.colIndex)
        return (<div className='cell' style={{ backgroundColor: activeCell.color }} key={`${cell.rowIndex}-${cell.colIndex}`}></div>)
      } else {
        return (<div className='cell' style={{ backgroundColor: cell.color }} key={`${cell.rowIndex}-${cell.colIndex}`}></div>)
      }
    })}
  </div>)
}
