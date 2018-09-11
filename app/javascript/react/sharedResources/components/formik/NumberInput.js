import React from 'react'
import { Field } from 'formik'

const NumberInput = ({
  disabled,
  error,
  inlineLabel,
  label,
  name,
  touched
}) => {
  if (inlineLabel) {
    const inputClass = (touched & error) ? 'input-group-field is-invalid-label' : 'input-group-field'
    return(
      <fieldset>
        <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
        <div className='input-group'>
          <span className='input-group-label'>{inlineLabel}</span>
          <Field
            className={inputClass}
            disabled={disabled}
            name={name}
            type='number'
          />
        </div>
        { touched && error && <span className='form-error is-visible'>{error}</span> }
      </fieldset>
    )
  }

  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
      <Field
        className={ touched && error && 'is-invalid-input' }
        disabled={disabled}
        name={name}
        type='number'
      />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default NumberInput
