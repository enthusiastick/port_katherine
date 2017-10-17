import React, { Component } from 'react'
import { Field } from 'redux-form'

import EditUserEmail from '../components/formFields/EditUserEmail'
import Password from '../components/formFields/Password'
import TextArea from '../../../sharedResources/components/formFields/TextArea'
import TextInput from '../../../sharedResources/components/formFields/TextInput'

class EditUserFormContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>{this.props.currentUser.handle}</h1>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-inputs'>
              <Field name='email' label='Email' component={EditUserEmail} />
              <div className='row'>
                <div className='small-12 medium-6 columns'>
                  <Field name='firstName' label='First name' component={TextInput} />
                </div>
                <div className='small-12 medium-6 columns'>
                  <Field name='lastName' label='Last name' component={TextInput} />
                </div>
              </div>
              <Field
                name='selfReport'
                label='Food allergies and other information'
                component={TextArea}
              />
              <Field name='password' label='Current password' component={Password} />
            </div>
            <div className='form-actions'>
              <button className='button' disabled={this.props.submitting} type='submit'>Update</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditUserFormContainer
