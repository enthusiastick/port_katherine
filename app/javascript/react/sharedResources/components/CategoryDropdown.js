import React from 'react'
import { Field } from 'formik'

const CategoryDropdown = props => {

  let { error } = props

  return(
    <fieldset>
      <label className={ error && 'is-invalid-label' } htmlFor='category'> Type
        <Field component='select' name='category'>
          <option key='pleaseSelect' value=''>– Choose a Type –</option>
          <option key='apothecary' value='apothecary'>Apothecary</option>
          <option key='calibration' value='calibration'>Calibration</option>
          <option key='engineering' value='engineering'>Engineering</option>
          <option key='focus' value='focus'>Focus</option>
          <option key='lesson' value='lesson'>Lesson</option>
          <option key='newspaper' value='newspaper'>Newspaper</option>
          <option key='note_to_staff' value='note_to_staff'>Note to Staff</option>
          <option key='political_influence' value='political_influence'>Political Influence</option>
          <option key='professions' value='professions'>Professions</option>
          <option key='research_experimentation' value='research_experimentation'>Research/Experimentation</option>
           <option key='miscellaneous' value='miscellaneous'>Miscellaneous</option>
        </Field>
      </label>
      { error && <span className='form-error is-visible'>{error}</span> }
    </fieldset>
  )
}

export default CategoryDropdown
