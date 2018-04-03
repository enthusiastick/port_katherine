import React, { Component } from 'react'
import { Formik } from 'formik'

import AdminPointDispenserForm from '../forms/AdminPointDispenserForm'

class AdminPointDispenserContainer extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit(values) {
    debugger
  }

  validate(values) {
    let errors = {}
    if (values.points < 1) {
      errors.points = 'You must award at least 1 CP'
    }

    if (values.reason === null || values.reason === '') {
      errors.reason = 'You must supply a reason'
    }

    if (values.users.length < 1) {
      errors.users = 'You must select at least one user'
    }

    return errors
  }

  render() {
    const initialValues = {
      points: 0,
      reason: '',
      users: []
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Award CP to Users</h1>
          <Formik
            component={AdminPointDispenserForm}
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validate={this.validate}
          />
        </div>
      </div>
    )
  }
}

export default AdminPointDispenserContainer
