import React, { Component } from 'react'
import { Field } from 'redux-form'

import CreditCardInput from '../../../sharedResources/components/formFields/CreditCardInput'
import monthOptions from '../../../sharedResources/constants/monthOptions'
import Select from '../../../sharedResources/components/formFields/Select'
import TextArea from '../../../sharedResources/components/formFields/TextArea'
import TextInput from '../../../sharedResources/components/formFields/TextInput'
import yearOptions from '../../../sharedResources/constants/yearOptions'

class RegistrationFormContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug && !this.props.event) {
      this.props.getEvents()
    }
  }

  render() {
    if (this.props.event) {
      let { pristine, submitting } = this.props

      let heading = `Register for ${this.props.event.name}`

      let passOptions = this.props.event.passes.map(pass => {
        return({ value: pass.slug, label: `[${pass.price}] ${pass.name}` })
      })

      return(
        <div className='row'>
          <div className='small-12 columns'>
            <h1 className='text-center top-padded'>
              {heading}
            </h1>
            <form onSubmit={this.props.handleSubmit}>
              <div className='form-inputs'>
                <Select
                  form='register'
                  label='Event Pass'
                  name='pass'
                  options={passOptions}
                />
                <hr />
                  <h5>Credit Card Information</h5>
                  <Field name='cardholderName' label='Cardholder Name' component={TextInput} />
                  <Field name='cardNumber' label='Card Number' component={CreditCardInput} />
                  <div className='row'>
                    <div className='small-12 medium-4 columns'>
                      <Select
                        form='register'
                        includeBlank={true}
                        label='Expiration Month'
                        name='expirationMonth'
                        options={monthOptions}
                      />
                    </div>
                    <div className='small-12 medium-4 columns'>
                      <Select
                        form='register'
                        includeBlank={true}
                        label='Expiration Year'
                        name='expirationYear'
                        options={yearOptions}
                      />
                    </div>
                    <div className='small-12 medium-4 columns'>
                      <Field name='cardVerification' label='Card Verification' component={TextInput} />
                    </div>
                  </div>
                <hr />
                <Field name='userSelfReport' label='Food allergies and other information' component={TextArea} />
              </div>
              <div className='form-actions'>
                <button className='button' disabled={pristine || submitting} type='submit'>Register</button>
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return(<div />)
    }
  }
}

export default RegistrationFormContainer
