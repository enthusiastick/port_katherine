import React from 'react'
import { Field } from 'formik'

const CheckInCharacterSelect = ({onChange, options, value}) => {
  const optionElements = options.map(option => {
    return(<option key={option.id} value={option.id}>{option.name}</option>)
  })

  return(
    <fieldset>
      <Field className='bottomless' component='select' name='characterId'>
        <option disabled>Select character</option>
        {optionElements}
      </Field>
    </fieldset>
  )
}

export default CheckInCharacterSelect
