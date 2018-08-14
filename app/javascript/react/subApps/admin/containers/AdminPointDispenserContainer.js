import React, { Component } from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'

import AdminPointDispenserForm from '../forms/AdminPointDispenserForm'

import { authorizeUserRole } from '../constants/restrictAccess'

class AdminPointDispenserContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isAdmin, this.props.push, this.props.flashNotice)
  }

  validate(values) {
    let errors = {}
    if (values.points < 0.0) {
      errors.points = 'You must award a positive amount of CP'
    }

    if (values.reason === null || values.reason === '') {
      errors.reason = 'You must supply a reason'
    }

    if (values.users.length < 1) {
      errors.users = 'You must select at least one user'
    }

    return errors
  }

  handleSubmit = (values, actions) => {
    this.props.awardCP(values)
    actions.resetForm()
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
          <div className='text-center top-padded'>
            <h1>Award CP to Users</h1>
            <Link to='/admin/transfer_character_points' className='button'>Transfer</Link>
          </div>
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
