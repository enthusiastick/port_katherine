import React from 'react'

import FilterSelect from '../../../../sharedResources/components/formik/FilterSelect'

const HiddenSkills = ({
  errors,
  handleSubmit,
  isSubmitting,
  setFieldTouched,
  setFieldValue,
  skills,
  touched,
  values
}) => (
  <form onSubmit={handleSubmit}>
    <div className='form-inputs'>
      <FilterSelect
        error={errors.skills}
        options={skills}
        label='Hidden Skills'
        multi={true}
        name='skills'
        onBlur={setFieldTouched}
        setFieldValue={setFieldValue}
        touched={touched.skills}
        value={Object.values(values.skills)}
      />
    </div>
    <div className='form-actions'>
      <button className='button' type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </div>
  </form>
)

export default HiddenSkills
