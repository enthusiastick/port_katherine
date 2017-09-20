import React from 'react'

const EditUserEmail = props => {
  let { label, meta: { error, touched }, name } = props

  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
      <input className={ touched && error && 'is-invalid-input' } id={name} type='text' {...props.input} />
      { touched && error && <span className='form-error is-visible'>{error}</span> }
      { touched && <div className='callout warning'><strong>Notice:</strong> If your account email is changed, you will be signed out, and will need to confirm your new email to re-activate your account.</div> }
    </fieldset>
  )
}

export default EditUserEmail
