import React from 'react'
import EventUserSelect from '../components/formFields/EventUserSelect'
import TextArea from '../../../sharedResources/components/formik/TextArea'

const LodgingSurveyForm = ({
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
    <form onSubmit={handleSubmit}>
      <div className='form-inputs'>
        <div className='row'>
          <div className='small-12 medium-6 columns'>
            <EventUserSelect
              errors={errors.favoredUsers}
              eventSlug={values.eventSlug}
              label='I would prefer to share lodgings with (select 1 or more)'
              name='favoredUsers'
              value={values.favoredUsers}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              touched={touched.favoredUsers}
            />
          </div>
          <div className='small-12 medium-6 columns'>
            <EventUserSelect
              errors={errors.undesirableUsers}
              eventSlug={values.eventSlug}
              label='I would prefer NOT to share lodgings with (select 1 or more)'
              name='undesirableUsers'
              value={values.undesirableUsers}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              touched={touched.undesirableUsers}
            />
          </div>
        </div>
        <TextArea
          error={errors.comments}
          touched={touched.comments}
          handleBlur={handleBlur}
          handleChange={handleChange}
          label='Anything else we should know?'
          name='comments'
          value={values.comments}
        />
      </div>
      <div className='form-actions'>
      </div>
    </form>
  )
}

export default LodgingSurveyForm
