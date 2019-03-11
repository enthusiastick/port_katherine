import React from 'react'
import FilterSelect from '../../../../sharedResources/components/formik/FilterSelect'
import { Effect } from 'formik-effect'

const BgsForm = ({
  errors,
  events,
  handleEventChange,
  handleSubmit,
  isSubmitting,
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
    </div>
  </form>
)

export default BgsForm
