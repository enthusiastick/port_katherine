import React, { Component } from 'react'
import { Field } from 'redux-form'
import { push } from 'react-router-redux'

import { flashNotice } from '../../../sharedResources/actions/flashNotice'

import normalizeNoWhiteSpace from '../../../sharedResources/constants/normalizeNoWhiteSpace'
import Password from '../components/formFields/Password'
import ReCaptcha from '../components/formFields/ReCaptcha'
import TextInput from '../../../sharedResources/components/formFields/TextInput'

class SignUpFormContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.currentUser.id) {
      this.props.dispatch(push('/'))
      this.props.dispatch(flashNotice({ alert: 'You are already signed in.' }))
    }
  }

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Sign Up</h1>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-inputs'>
              <Field name='handle' label='Username' normalize={normalizeNoWhiteSpace} component={TextInput} />
              <Field name='email' label='Email' normalize={normalizeNoWhiteSpace} component={TextInput} />
              <div className='row'>
                <div className='small-12 medium-6 columns'>
                  <Field name='firstName' label='First name' component={TextInput} />
                </div>
                <div className='small-12 medium-6 columns'>
                  <Field name='lastName' label='Last name' component={TextInput} />
                </div>
              </div>
              <Field name='password' label='Password' component={Password} />
              <Field name='passwordConfirmation' label='Password confirmation' component={Password} />
              <Field name='reCaptchaResponse' component={ReCaptcha} />
            </div>
            <div className='form-actions'>
              <button className='button' disabled={this.props.submitting} type='submit'>Register</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUpFormContainer
