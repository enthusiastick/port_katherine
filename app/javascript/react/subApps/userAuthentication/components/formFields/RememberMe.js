import React from 'react'
import { change } from 'redux-form'

const RememberMe = props => {
  let changeHandler = (event) => {
    props.switchHandler(event.target.checked)
  }

  return(
    <fieldset>
      <div className='row'>
        <div className='small-3 medium-1 columns'>
          <div className='switch'>
            <input onClick={this.handleClick} className='switch-input' id='rememberMe' type='checkbox' onChange={changeHandler} />
            <label className='switch-paddle' htmlFor='rememberMe'>
              <span className='show-for-sr'>Remember me on this device</span>
            </label>
          </div>
        </div>
        <div className='small-9 medium-11 columns'>
          Remember me on this device
        </div>
      </div>
    </fieldset>
  )
}

export default RememberMe
