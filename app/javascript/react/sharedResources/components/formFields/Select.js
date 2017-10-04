import React from 'react'
import { connect } from 'react-redux'
import { Field, getFormMeta, getFormSyncErrors } from 'redux-form'

const mapStateToProps = (state, ownProps) => {
  let errorState = getFormSyncErrors(ownProps.form)(state)
  let metaState = getFormMeta(ownProps.form)(state)

  let error = ''
  let meta = { touched: false }

  if (errorState && errorState[ownProps.name]) {
    error = errorState[ownProps.name]
  }

  if (metaState) {
    meta = Object.assign({}, meta, metaState[ownProps.name])
  }

  return {
    error: error,
    meta: meta
  }
}

const SelectField = props => {
  let { error, meta: { touched } } = props

  let options = props.options.map(option => {
    return(<option key={option.value} value={option.value}>{option.label}</option>)
  })

  if (props.includeBlank) {
    options.unshift(<option key='includeBlank' />)
  }

  return(
    <fieldset>
      <label className={ touched && error && 'is-invalid-label' } htmlFor={props.name}>{props.label}
        <Field name={props.name} component='select'>
          {options}
        </Field>
      </label>
      { touched && error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

const Select = connect(
  mapStateToProps
)(SelectField)

export default Select
