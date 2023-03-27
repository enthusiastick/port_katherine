import React from 'react'
import { Field } from 'formik'

import BgsCharacterSelect from './CharacterSelect'
import BgsTitleAndBody from './TitleAndBody'
import FilterSelect from '../../../../../sharedResources/components/formik/FilterSelect'

const BgsForm = ({
  errors,
  handleEventChange,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  fetchedEvent,
  setFieldTouched,
  setFieldValue,
  touched,
  values
}) => (
  <form onSubmit={handleSubmit}>
    <div className='form-inputs'>
      <BgsCharacterSelect
        error={errors.character}
        fetchedEvent={fetchedEvent}
        selectedCharacter={values.character}
        selectedEvent={values.event}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
        touched={touched.character}
      />
      <fieldset>
        <label htmlFor='category'> Type
          <Field component='select' name='category'>
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
      </fieldset>
      <BgsTitleAndBody
        bodyError={errors.body}
        bodyTouched={touched.body}
        bodyValue={values.body}
        categoryValue={values.category}
        handleBlur={handleBlur}
        handleChange={handleChange}
        selectedCharacter={values.character}
        selectedEvent={values.event}
        titleError={errors.title}
        titleTouched={touched.title}
        titleValue={values.title}
      />
    </div>
    <div className='form-actions'>
     <button className='button' type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </div>
  </form>
)

export default BgsForm
