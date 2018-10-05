import React from 'react'

const Switch = ({
    label,
    name,
    setFieldValue,
    touched,
    value
}) => {
  const switchHandler = (event) => {
    setFieldValue(name, event.target.checked)
  }

  if (value === undefined) { return null }

  return(
    <fieldset className='no-padding'>
      <div className='row'>
        <div className='small-3 medium-2 columns'>
          <div className='switch'>
            <input className='switch-input' id={name} onChange={switchHandler} type='checkbox' checked={value} />
            <label className='switch-paddle' htmlFor={name}>
              <span className='show-for-sr'>{label}</span>
            </label>
          </div>
        </div>
        <div className='small-9 medium-10 columns'>
          {label}
        </div>
      </div>
    </fieldset>
  )
}

export default Switch
