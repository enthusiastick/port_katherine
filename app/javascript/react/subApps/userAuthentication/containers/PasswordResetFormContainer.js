import React, { Component } from 'react'
import { Field } from 'redux-form'

import { flashNotice } from '../../../sharedResources/actions/flashNotice'

import Password from '../components/formFields/Password'

class PasswordResetFormContainer extends Component {
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
        <h1 className='text-center top-padded'>Reset Password</h1>
        <form onSubmit={this.props.handleSubmit}>
          <div className='form-inputs'>
            <Field name='password' label='Password' component={Password} />
            <Field name='passwordConfirmation' label='Password confirmation' component={Password} />
          </div>
          <div className='form-actions'>
            <button className='button' disabled={this.props.submitting} type='submit'>Update Password</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

export default PasswordResetFormContainer
