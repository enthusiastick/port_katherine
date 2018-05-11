import React from 'react'

const TextInput = ({
  disabled,
  error,
  touched,
  handleBlur,
  handleChange,
  label,
  name,
  value
}) => {
  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>Subject</label>
      <input
        id={name}
        className={ touched && error && 'is-invalid-input' }
        disabled={disabled}
        name={name}
        type='text'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default TextInput
