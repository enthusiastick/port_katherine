import React from 'react'
import EventUserSelect from '../components/formFields/EventUserSelect'
import Switch from '../../../sharedResources/components/formik/Switch'
import TextArea from '../../../sharedResources/components/formik/TextArea'

const LodgingQuestionnaireForm = ({
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
      <div className='form-inputs stretched'>
        <Switch
          label='I will be lodging in a tent that I provide'
          name='tenting'
          value={values.tenting}
          setFieldValue={setFieldValue}
          touched={touched.tenting}
        />
        <div className='row'>
          <div className='small-12 medium-6 columns'>
            <EventUserSelect
              disabled={values.tenting}
              error={errors.favoredUsers}
              eventSlug={values.eventSlug}
              label='I would prefer to share lodgings with (select 1 or more)'
              name='favoredUsers'
              value={values.favoredUsers}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              placeholder='Start typing a friend&apos;s name&hellip;'
              touched={touched.favoredUsers}
            />
          </div>
          <div className='small-12 medium-6 columns'>
            <EventUserSelect
              disabled={values.tenting}
              error={errors.undesirableUsers}
              eventSlug={values.eventSlug}
              label='I would prefer NOT to share lodgings with (select 1 or more)'
              name='undesirableUsers'
              value={values.undesirableUsers}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              placeholder='Start typing a player&apos;s name&hellip;'
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
        <button className='button' type='submit' disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default LodgingQuestionnaireForm
