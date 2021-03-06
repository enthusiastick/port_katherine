import React, { Component } from 'react'
import { Field } from 'redux-form'

import CreditCardInput from '../../../sharedResources/components/formFields/CreditCardInput'
import Select from '../../../sharedResources/components/formFields/Select'
import TextArea from '../../../sharedResources/components/formFields/TextArea'
import TextInput from '../../../sharedResources/components/formFields/TextInput'

import normalizeCardVerification from '../../../sharedResources/constants/normalizeCardVerification'
import normalizeCreditCard from '../../../sharedResources/constants/normalizeCreditCard'

import monthOptions from '../../../sharedResources/constants/monthOptions'
import yearOptions from '../../../sharedResources/constants/yearOptions'

class RegistrationFormContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug && !this.props.event) {
      this.props.getEvents()
    }

    if (this.props.event && !this.props.currentUser.id) {
      this.props.clearNotices()
      this.props.flashNotice({ alert: 'You must be signed in to register.' })
      this.props.push('/sign-in')
    }

    if (this.props.event) {
      if (this.props.event['capped?']) {
        this.props.clearNotices()
        this.props.flashNotice({ alert: 'Player passes for this event are sold out. Please email staff@portkatherine.com about our waiting list.' })
        this.props.push('/events')
      } else if (!this.props.event['registerable?']) {
        this.props.clearNotices()
        this.props.flashNotice({ alert: 'Registration for this event is not currently available.' })
        this.props.push('/events')
      }
    }

    if (this.props.event && this.props.event.userBooking) {
      this.props.clearNotices()
      this.props.flashNotice({ alert: 'You are already registered for this event.' })
      this.props.push('/events')
    }

    if (this.props.currentUser.id && !this.props.token) {
      this.props.getToken()
    }
  }

  render() {
    if (this.props.event) {
      let { pristine, submitting } = this.props
      let newPlayerDiscountNotice
      let passObjects = this.props.event.passes

      let heading = `Register for ${this.props.event.name}`

      if (!this.props.currentUser.newPlayerDiscountedAt && this.props.event["newPlayerDiscountEligible?"]) {
        newPlayerDiscountNotice =
          <p className='callout warning'><strong>Notice:</strong>
          &nbsp;As a new player, single event passes will automatically be
          discounted to $20</p>
      }

      let passOptions = passObjects.map(pass => {
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
                {newPlayerDiscountNotice}
                <hr />
                  <h5>Credit Card Information</h5>
                  <Field
                    name='cardholderName'
                    label='Cardholder Name'
                    component={TextInput}
                  />
                  <Field
                    name='cardNumber'
                    label='Card Number'
                    component={CreditCardInput}
                    normalize={normalizeCreditCard}
                  />
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
                      <Field
                        name='cardVerification'
                        label='Card Verification'
                        component={TextInput}
                        normalize={normalizeCardVerification}
                      />
                    </div>
                  </div>
                <hr />
                <Field
                  name='userSelfReport'
                  label='Food allergies and other information'
                  component={TextArea}
                />
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
