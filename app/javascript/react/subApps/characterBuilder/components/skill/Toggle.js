import React from 'react'

const Toggle = ({characterSkillId, handleDecrease, handleIncrease, ranks}) => {

  let button, className

  className = 'four-wide left-margin-spacer button bottomless'

  button = (
    <div
      className={className}
      onClick={handleIncrease}
    >
      <i className='fa fa-square-o white' />
    </div>
  )

  if (characterSkillId && ranks === 1) {
    className += ' hollow'
    button = (
      <div className={className}>
        <i className='fa fa-check white' />
      </div>
    )
  }

  if (!characterSkillId && ranks === 1) {
    className += ' bg-solarized-yellow'
    button = (
      <div
        className={className}
        onClick={handleDecrease}
      >
        <i className='fa fa-check-square white' />
      </div>
    )
  }

  return (
    <div className='auto cell'>
      <div className='text-center'>
        {button}
      </div>
    </div>
  )
}

export default Toggle
