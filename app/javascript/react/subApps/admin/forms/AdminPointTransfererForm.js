import React from 'react'

import RecipientInfo  from '../components/RecipientInfo'
import UserSelect from '../../../sharedResources/components/formik/UserSelect'

const AdminPointTransfererForm = ({
  errors,
  handleSubmit,
  handleBlur,
  handleChange,
  isSubmitting,
  values,
  setFieldValue,
  setFieldTouched,
  touched
}) => (
  <form onSubmit={handleSubmit}>
    <div className='form-inputs'>
      <div className='row'>
        <div className='small-12 medium-4 columns'>
          <fieldset className='fieldset'>
            <legend>Donor</legend>
            <UserSelect
                errors={errors.donor}
                value={values.donor}
                multi={false}
                name='donor'
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.donor}
             />
          </fieldset>
        </div>
        <div className='small-12 medium-4 columns'>
          <fieldset className='fieldset'>
            <legend>is sending to</legend>
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
            { touched.points && errors.points && <span className='bottomless form-error is-visible'>{errors.points}</span> }
          </fieldset>
        </div>
        <div className='small-12 medium-4 columns'>
          <fieldset className='fieldset'>
            <legend>Recipient</legend>
            <UserSelect
                errors={errors.recipient}
                value={values.recipient}
                multi={false}
                name='recipient'
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.recipient}
             />
            {(values.recipient) && <RecipientInfo points={values.points} {...values.recipient} />}
          </fieldset>
        </div>
      </div>
    </div>
    <div className='form-actions'>
      <button className='button' type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </div>
  </form>
)

export default AdminPointTransfererForm
