import React from 'react'
import { connect } from 'react-redux'

import EditUserForm from '../forms/EditUserForm'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
  }
}

const EditUser = connect(
  mapStateToProps
)(EditUserForm)

export default EditUser
