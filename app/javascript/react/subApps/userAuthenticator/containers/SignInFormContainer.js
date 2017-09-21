import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { flashNotice } from '../../../sharedResources/actions/flashNotice'

import Password from '../components/formFields/Password'
import RememberMe from '../components/formFields/RememberMe'
import TextInput from '../../../sharedResources/components/formFields/TextInput'

class SignInFormContainer extends Component {
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
          <h1 className='text-center top-padded'>Sign In</h1>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-inputs'>
              <Field name='login' label='Email or username' component={TextInput} />
              <Field name='password' label='Password' showForgotLink={true} component={Password} />
              <Field name='rememberMe' component={RememberMe} switchHandler={this.props.switchHandler} />
            </div>
            <div className='form-actions'>
              <button className='button' disabled={this.props.submitting} type='submit'>Sign In</button>
              &nbsp;
              &nbsp;
              <Link className='button' to='/sign-up'>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignInFormContainer
