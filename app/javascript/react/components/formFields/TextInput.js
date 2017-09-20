import React from 'react'

const TextInput = props => {
  let { label, meta: { error, touched }, name } = props

  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
      <input className={ touched && error && 'is-invalid-input' } id={name} type='text' {...props.input} />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default TextInput
