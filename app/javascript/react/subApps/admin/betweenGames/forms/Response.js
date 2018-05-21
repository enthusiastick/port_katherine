import React from 'react'

import TextArea from '../../../../sharedResources/components/formik/TextArea'
import TextInput from '../../../../sharedResources/components/formik/TextInput'

const ResponseForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className='bottomless card'>
        <div className='card-section form-inputs'>
          <TextInput
            error={errors.responseTitle}
            touched={touched.responseTitle}
            handleBlur={handleBlur}
            handleChange={handleChange}
            label='Title'
            name='responseTitle'
            value={values.responseTitle}
          />
        </div>
        <div className='card-section form-actions'>
          <button className='button bottomless float-right' type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default ResponseForm
