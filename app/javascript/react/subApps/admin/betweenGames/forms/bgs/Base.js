import React from 'react'
import { Effect } from 'formik-effect'

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
    <Effect onChange={(currentFormikState, nextFormikState) => {
        if (currentFormikState.values.event.value !== nextFormikState.values.event.value) {
          handleEventChange(nextFormikState.values.event.value)
        }
      }}
    />
    <div className='form-inputs'>
      <fieldset>
        <FilterSelect
          error={errors.event}
          label='Event'
          options={events}
          multi={false}
          name='event'
          onBlur={setFieldTouched}
          setFieldValue={setFieldValue}
          touched={touched.event}
          value={values.event}
        />
      </fieldset>
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
        handleBlur={handleBlur}
        handleChange={handleChange}
        selectedCharacter={values.character}
        selectedEvent={values.event}
        titleError={errors.title}
        titleTouched={touched.title}
        titleValue={values.title}
      />
    </div>
  </form>
)

export default BgsForm
