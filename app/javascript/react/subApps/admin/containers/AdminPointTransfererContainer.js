import React, { Component } from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'

import AdminPointTransfererForm from '../forms/AdminPointTransfererForm'

class AdminPointTransfererContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInAdmin(nextProps.isAdmin)
  }

  validate(values) {
    let errors = {}
    if (!values.donor) {
      errors.donor = 'You must select a donor'
    }

    if (values.points < 0.1) {
      errors.points = 'You must transfer a positive amount of CP'
    }

    if (!values.recipient) {
      errors.recipient = 'You must select a recipient'
    }

    return errors
  }

  handleSubmit = (values, {resetForm}) => {
    console.log(values)
    resetForm()
  }

  render() {
    const initialValues = {
      donor: null,
      points: 0,
      recipient: null
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='text-center top-padded'>
            <h1>Transfer CP Between Users</h1>
            <Link to='/admin/award_character_points' className='button'>Award</Link>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validate={this.validate}
            render={(formikProps) => <AdminPointTransfererForm {...formikProps} />}
          />
        </div>
      </div>
    )
  }
}

export default AdminPointTransfererContainer
