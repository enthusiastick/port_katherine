import React from 'react'
import { Link } from 'react-router-dom'

const Password = props => {
  let { label, meta: { error, touched }, name } = props
  let labelElement

  if (props.showForgotLink) {
    labelElement = (
      <div className='row'>
        <div className='small-3 medium-1 columns'>
          <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
        </div>
        <div className='small-9 medium-11 columns'>
          <label>
            <Link to='password_resets/new'>Forgot your password?</Link>
          </label>
        </div>
      </div>)
  } else {
    labelElement = <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
  }

  return(
    <fieldset>
      {labelElement}
      <input className={ touched && error && 'is-invalid-input' } id={name} type='password' {...props.input} />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default Password
