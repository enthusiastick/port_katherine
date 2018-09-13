import React from 'react'

const Switch = ({
    errors,
    label,
    name,
    setFieldValue,
    touched,
    values
  }) => {
  const switchHandler = (event) => {
    setFieldValue(name, event.target.checked)
  }

  return(
    <fieldset className='no-padding'>
      <div className='row'>
        <div className='small-3 medium-1 columns'>
          <div className='switch'>
            <input className='switch-input' id={name} onChange={switchHandler} type='checkbox' />
            <label className='switch-paddle' htmlFor={name}>
              <span className='show-for-sr'>{label}</span>
            </label>
          </div>
        </div>
        <div className='small-9 medium-11 columns'>
          {label}
        </div>
      </div>
    </fieldset>
  )
}

export default Switch
