import React from 'react'

const DateTime = props => {
  let { label, meta: { error, touched }, name } = props

  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
      <input className={ touched && error && 'is-invalid-input' } id={name} placeholder='mm/dd/yyyy, --:-- --' type='datetime-local' {...props.input} />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default DateTime
