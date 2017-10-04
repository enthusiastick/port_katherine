import React from 'react'

const TextArea = props => {
  let { label, meta: { error, touched }, name } = props

  let textareaStyle = { minHeight: '12rem'}

  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
      <textarea className={ touched && error && 'is-invalid-input' } id={name} style={textareaStyle} {...props.input} />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default TextArea
