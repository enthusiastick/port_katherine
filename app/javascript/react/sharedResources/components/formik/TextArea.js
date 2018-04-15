import React from 'react'

const TextArea = ({
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
      <textarea
        className={ touched && error && 'is-invalid-input' }
        disabled={disabled}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default TextArea
