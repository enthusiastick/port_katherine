import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const ReCaptcha = props => {
  return(
    <fieldset className='google-recaptcha'>
      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_PUBLIC_KEY}
        onChange={props.input.onChange}
      />
    </fieldset>
  )
}

export default ReCaptcha
