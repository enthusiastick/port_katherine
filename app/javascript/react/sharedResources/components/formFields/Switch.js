import React from 'react'

const Switch = props => {
  let changeHandler = (event) => {
    props.switchHandler(event.target.checked)
  }

  return(
    <fieldset>
      <div className='row'>
        <div className='small-3 medium-1 columns'>
          <div className='switch'>
            <input onClick={this.handleClick} className='switch-input' id={props.name} type='checkbox' onChange={changeHandler} />
            <label className='switch-paddle' htmlFor={props.name}>
              <span className='show-for-sr'>{props.label}</span>
            </label>
          </div>
        </div>
        <div className='small-9 medium-11 columns'>
          {props.label}
        </div>
      </div>
    </fieldset>
  )
}

export default Switch
