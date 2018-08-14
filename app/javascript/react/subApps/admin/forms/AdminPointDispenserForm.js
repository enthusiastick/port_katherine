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
            multi={true}
            name='users'
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
            name='points'
            onChange={handleChange}
            onBlur={handleBlur}
            type='number'
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
          <input
            id='reason'
            onChange={handleChange}
            onBlur={handleBlur}
            type='text'
            value={values.reason}
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
