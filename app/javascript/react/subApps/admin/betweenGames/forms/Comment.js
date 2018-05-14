import React from 'react'
import TextArea from '../../../../sharedResources/components/formik/TextArea'

const CommentForm = ({
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
      <div className='callout bottomless'>
        <div className='form-inputs small-text'>
          <TextArea
            error={errors.body}
            touched={touched.body}
            handleBlur={handleBlur}
            handleChange={handleChange}
            label='Comment:'
            name='body'
            value={values.body}
          />
        </div>
        <div className='form-actions text-right'>
          <button className='button bottomless small' type='submit' disabled={isSubmitting}>
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default CommentForm
