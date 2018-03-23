import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router-dom'

import { restrictToAdmin } from '../../constants/restrictAccess'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import DateTime from '../../../../sharedResources/components/formFields/DateTime'
import NumberInput from '../../../../sharedResources/components/formFields/NumberInput'
import TextArea from '../../../../sharedResources/components/formFields/TextArea'
import TextInput from '../../../../sharedResources/components/formFields/TextInput'

class EventFormContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictToAdmin(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.eventSlug && !this.props.event) {
      this.props.getAdminEvents()
    }
  }

  render() {
    let breadcrumbs = [{ to: '/admin/events', label: 'Events' }]

    let label

    if (this.props.eventSlug && this.props.event) {
      label = `Edit ${this.props.event.name}`
    } else {
      label = 'New Event'
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
        <BreadcrumbsNav breadcrumbs={breadcrumbs} current={label} />
        <h1 className='text-center'>{label}</h1>
        <form onSubmit={this.props.handleSubmit}>
          <div className='form-inputs'>
            <Field name='name' label='Name' component={TextInput} />
            <Field name='startTime' label='Start Date' component={DateTime} />
            <Field name='endTime' label='End Date' component={DateTime} />
            <Field name='address' label='Address' component={TextInput} />
            <Field name='description' label='Info' component={TextArea} />
            <Field name='latitude' label='Latitude' component={NumberInput} />
            <Field name='longitude' label='Longitude' component={NumberInput} />
          </div>
          <div className='form-actions'>
            <button className='button' disabled={this.props.submitting} type='submit'>Save</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

export default EventFormContainer
