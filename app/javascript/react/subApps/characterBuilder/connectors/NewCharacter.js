import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { createCharacter } from '../actions/createCharacter'
import { getHeaders } from '../actions/getHeaders'
import NewCharacterForm from '../forms/NewCharacterForm'

import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'

const mapStateToProps = state => {
  if (Object.keys(state.headers.item).length === 0) {
    return {
      headers: state.headers.item
    }
  } else {
    let initialValues = {
      birthplace: 'chepstone',
      firstProfessionId: state.headers.item.profession[0]['id'],
      firstTrueHeaderId: state.headers.item.stock[0]['id']
    }

    return {
      headers: state.headers.item,
      initialValues: initialValues,
      isSignedIn: isSignedIn(state)
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCharacter: values => {
      dispatch(createCharacter(values))
    },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getHeaders: () => { dispatch(getHeaders()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const NewCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCharacterForm)

export default NewCharacter
