import React from 'react'
import { FieldArray } from 'formik'

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
  const categories = [
    {
      icon: 'eye',
      id: 'reveal_immediately',
      name: 'Reveal Immediately'
    },
    {
      icon: 'bell',
      id: 'before_event',
      name: 'Before the Event'
    },
    {
      icon: 'flag-checkered',
      id: 'after_event',
      name: 'After the Event'
    },
    {
      icon: 'eye-slash',
      id: 'do_not_reveal',
      name: 'Do Not Reveal'
    }
  ]

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
          <fieldset className='fieldset topless'>
            <legend>Select reveal timing:</legend>
            <FieldArray
              name='category'
              render={arrayHelpers => (
                <div className='row'>
                  {categories.map(category => (
                    <div className='small-12 medium-3 columns' key={category.id}>
                      <div className={values.category === category.id ? 'button' : 'button hollow'}>
                        <div className='text-center'>
                          <label>
                            <input
                              className='bottomless'
                              name='category'
                              type='radio'
                              value={category.id}
                              checked={values.category === category.id}
                              onChange={handleChange}
                            />
                              <i className={`fa fa-${category.icon}`} /> {category.name}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
          </fieldset>
        </div>
        <div className='card-section form-actions'>
          <button
            className='button bottomless float-right'
            disabled={isSubmitting}
            type='submit'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default ResponseForm
