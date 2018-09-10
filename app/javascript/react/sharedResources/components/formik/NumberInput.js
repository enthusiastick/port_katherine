import React from 'react'

const NumberInput = ({
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
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
      <input
        id={name}
        className={ touched && error && 'is-invalid-input' }
        disabled={disabled}
        name={name}
        type='number'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default NumberInput
