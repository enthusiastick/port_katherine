import React from 'react'

import NumberInput from '../../../../sharedResources/components/formik/NumberInput'
import TextInput from '../../../../sharedResources/components/formik/TextInput'

const Skill = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values
}) => (
  <form onSubmit={handleSubmit}>
    <div className='form-inputs'>
      <TextInput
        error={errors.name}
        touched={touched.name}
        handleBlur={handleBlur}
        handleChange={handleChange}
        label='Name'
        name='name'
        value={values.name}
      />
      <NumberInput
        error={errors.startingCost}
        touched={touched.startingCost}
        handleBlur={handleBlur}
        handleChange={handleChange}
        label='Starting Cost'
        name='startingCost'
        values={values.startingCost}
      />
    </div>
    <div className='form-actions'>
      <button className='button' type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </div>
  </form>
)

export default Skill
