import React from 'react'

import BgsCharacterSelect from './CharacterSelect'
import BgsTitleAndBody from './TitleAndBody'
import FilterSelect from '../../../../../sharedResources/components/formik/FilterSelect'

const BgsForm = ({
  errors,
  events,
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
