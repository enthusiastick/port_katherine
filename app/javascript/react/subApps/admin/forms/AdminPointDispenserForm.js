import React from 'react'
import Autosuggest from 'react-autosuggest'

const AdminPointDispenserForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props

  const inputProps = {
    onChange: handleChange,
    value: values.user
  }

  const arbitraryFunction = () => {
    debugger
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-inputs'>
          <fieldset>
            <label htmlFor="user">User</label>
            <Autosuggest
              suggestions={values.suggestions}
              onSuggestionsFetchRequested={arbitraryFunction}
              onSuggestionsClearRequested={arbitraryFunction}
              getSuggestionValue={arbitraryFunction}
              renderSuggestion={arbitraryFunction}
              inputProps={inputProps}
            />
          </fieldset>
        </div>
      </form>
    </div>
  )
}

export default AdminPointDispenserForm
