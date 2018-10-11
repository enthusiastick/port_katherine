import React from 'react'

import FilterSelect from '../../../../sharedResources/components/formik/FilterSelect'
import NumberInput from '../../../../sharedResources/components/formik/NumberInput'

const Headers = ({
  errors,
  handleSubmit,
  headers,
  isSubmitting,
  setFieldTouched,
  setFieldValue,
  touched,
  values
}) => {

  return(
    <form onSubmit={handleSubmit}>
      <div className='form-inputs'>
        <div className='row'>
          <div className='small-12 medium-6 columns'>
            <FilterSelect
              error={errors.headers}
              options={headers}
              label='Headers'
              multi={true}
              name='headers'
              onBlur={setFieldTouched}
              setFieldValue={setFieldValue}
              touched={touched.headers}
              value={Object.values(values.headers)}
            />
          </div>
          <div className='small-12 medium-6 columns'>
            <NumberInput
              error={errors.cost}
              touched={touched.cost}
              label='Cost (per header)'
              name='cost'
              values={values.maxRank}
            />
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
}

export default Headers
