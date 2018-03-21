import React from 'react'
import { connect } from 'react-redux'

import { createCharacter } from '../actions/createCharacter'
import { getHeaders } from '../actions/getHeaders'
import NewCharacterForm from '../forms/NewCharacterForm'

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
      initialValues: initialValues
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCharacter: values => {
      dispatch(createCharacter(values))
    },
    getHeaders: () => { dispatch(getHeaders()) }
  }
}

const NewCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCharacterForm)

export default NewCharacter
