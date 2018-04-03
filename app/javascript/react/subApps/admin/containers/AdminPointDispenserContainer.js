import React, { Component } from 'react'
import { Formik } from 'formik'

import AdminPointDispenserForm from '../forms/AdminPointDispenserForm'

class AdminPointDispenserContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.adminUsers.length == 0) {
      this.props.getAdminUsers()
    }
  }

  handleSubmit(values) {
    debugger
  }

  render() {
    const initialValues = {
      suggestions: this.props.adminUsers.map(user => user.name),
      user: ''
    }


    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Award CP to Users</h1>
          <Formik
            component={AdminPointDispenserForm}
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default AdminPointDispenserContainer
