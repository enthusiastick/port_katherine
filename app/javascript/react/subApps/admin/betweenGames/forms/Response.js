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
  const pristine = Object.keys(touched).length === 0

  return(
    <form onSubmit={handleSubmit}>
      <div className='bottomless card'>
        <div className='card-section form-inputs medium-text'>
          <TextInput
            error={errors.responseTitle}
            touched={touched.responseTitle}
            handleBlur={handleBlur}
            handleChange={handleChange}
            label='Title'
            name='responseTitle'
            value={values.responseTitle}
          />
          <TextArea
            error={errors.response}
            touched={touched.response}
            handleBlur={handleBlur}
            handleChange={handleChange}
            label='Response'
            name='response'
            value={values.response}
          />
        </div>
        <div className='card-section form-actions'>
          <button className='button bottomless float-right' type='submit' disabled={pristine || isSubmitting}>
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default ResponseForm
