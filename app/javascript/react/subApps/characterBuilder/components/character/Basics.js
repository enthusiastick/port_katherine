import React from 'react'

const Basics = ({ available, birthplace, cycleSpendingCap, playerAvailable, spent, spentCycle }) => {

  return (
    <div>
      <p className='bottomless'>
        <strong>Place of Origin:</strong> {birthplace}
      </p>
      <p className='bottomless'>
        <strong>Player CP Available:</strong> {playerAvailable}
      </p>
      <p className='bottomless'>
        <strong>Character CP Available:</strong> {available}
      </p>
      <p className='bottomless'>
        <strong>CP Spent This Cycle:</strong> {spentCycle} / {cycleSpendingCap}
      </p>
      <p>
        <strong>Total CP Spent:</strong> {spent}
      </p>
    </div>
  )
}

export default Basics
