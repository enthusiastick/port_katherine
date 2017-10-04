import React from 'react'

const CreditCardInput = props => {
  let { label, meta: { error, touched }, name } = props

  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={name}>{label}</label>
      <div className='input-group'>
        <input className={`input-group-field ${ touched && error && 'is-invalid-input' }`} id={name} type='text' {...props.input} />
        <span className='input-group-label'>
          <a href={`https://www.braintreegateway.com/merchants/${process.env.BRAINTREE_MERCHANT_ID}/verified`} target='_blank'>
            <i className='fa fa-lock' />
          </a>
        </span>
      </div>
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default CreditCardInput
