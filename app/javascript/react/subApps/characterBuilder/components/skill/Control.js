import React from 'react'

const Control = ({decreaseClass, handleDecrease, handleIncrease, increaseClass, rankColorClass, ranks}) => {
  return(
    <div className='auto cell'>
      <div className='expanded button-group bottomless'>
        <div className={decreaseClass} onClick={handleDecrease}>
          <i className='fa fa-minus' />
        </div>
        <div className={rankColorClass}>
          <span className='header-font white'>
            {ranks}
          </span>
        </div>
        <div className={increaseClass} onClick={handleIncrease}>
          <i className='fa fa-plus' />
        </div>
      </div>
    </div>
  )
}

export default Control
