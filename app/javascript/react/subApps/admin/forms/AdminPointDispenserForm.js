import React from 'react'
import UserSelect from '../../../sharedResources/components/formik/UserSelect'

const AdminPointDispenserForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isSubmitting
  }) => {

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-inputs'>
         <UserSelect
            errors={errors.users}
            value={values.users}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            touched={touched.users}
         />
         <fieldset>
          <label
            className={ touched.points && errors.points && 'is-invalid-label' }
            htmlFor='points'
          >
            CP
          </label>
          <input
            id='number'
            type='number'
            name='points'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.points}
          />
          { touched.points && errors.points && <span className='form-error is-visible'>{errors.points}</span> }
         </fieldset>
         <fieldset>
          <label
            className={ touched.reason && errors.reason && 'is-invalid-label' }
            htmlFor='reason'
          >
            Reason
          </label>
          <textarea
            id='reason'
            style={ {minHeight: '4rem'} }
            onChange={handleChange}
            onBlur={handleBlur}
            values={values.reason}
          />
          { touched.reason && errors.reason && <span className='form-error is-visible'>{errors.reason}</span> }
         </fieldset>
        </div>
        <div className='form-actions'>
          <button className='button' type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminPointDispenserForm
