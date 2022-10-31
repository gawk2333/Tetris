import React, { useEffect, useState } from 'react'

export default function Playground () {
  useEffect(() => {
    createCells()
  }, [])
  const rowNumber = 12
  const colNumber = 10
  const [cells, setCells] = useState([])
  const createCells = () => {
    const currentCells = []
    for (let i = 1; i <= rowNumber; i++) {
      for (let j = 1; j <= colNumber; j++) {
        const newCell = {
          rowIndex: i,
          colIndex: j
        }
        currentCells.push(newCell)
      }
    }
    setCells(currentCells)
  }
  return (cells.length &&
    (<div className='playground'>
      {cells.map(cell => { return <div className='cell' key={`${cell.rowIndex}-${cell.colIndex}`}></div> })}
    </div>)
  )
}
