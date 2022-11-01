import React, { useCallback, useEffect, useState } from 'react'
import createActiveCellSpot from '../utils/objectCreater'
import _ from 'lodash'

const rowNumber = 12
const colNumber = 10
let gameInterval
const activeCellSpot = createActiveCellSpot()
export default function Playground ({ gameState }) {
  const [cells, setCells] = useState([])
  const [activeObject, setActiveObject] = useState(activeCellSpot)
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

  const checkIfTheNextSpotAvailable = (spot, direction) => {
    if (direction === 'down') {
      const [nextSpot] = cells.filter(cell => cell.rowIndex === spot.rowIndex + 1 && cell.colIndex === spot.colIndex)
      if (nextSpot.hasDroped === true) {
        return false
      }
      return true
    }
  }

  const settleCurrentSpot = (spot) => {
    spot.active = false
    spot.hasDroped = true
    const newCells = cells
      .filter(cell => cell.rowIndex !== spot.rowIndex || cell.colIndex !== spot.colIndex)
    newCells
      .push(spot)
    setCells(newCells.sort((a, b) => a.rowIndex - b.rowIndex || a.colIndex - b.colIndex))
  }

  const onGameStart = useCallback(() => {
    const spot = _.cloneDeep(activeObject)
    gameInterval = setTimeout(() => {
      spot.rowIndex++
      spot.active = true
      setActiveObject(spot)
    }, 1000)
    if (activeObject.rowIndex === rowNumber || !checkIfTheNextSpotAvailable(activeObject, 'down')) {
      settleCurrentSpot(spot)
      clearTimeout(gameInterval)
      setActiveObject(createActiveCellSpot())
    }
  }, [gameState, activeObject.rowIndex])

  const onGameStop = useCallback(() => {
    const spot = _.cloneDeep(activeObject)
    spot.active = false
    setActiveObject(spot)
    clearTimeout(gameInterval)
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
      if (cell.rowIndex === activeObject.rowIndex && cell.colIndex === activeObject.colIndex) {
        return (<div className='cell' style={{ backgroundColor: activeObject.color }} key={`${cell.rowIndex}-${cell.colIndex}`}></div>)
      } else {
        return (<div className='cell' style={{ backgroundColor: cell.color }} key={`${cell.rowIndex}-${cell.colIndex}`}></div>)
      }
    })}
  </div>)
}
