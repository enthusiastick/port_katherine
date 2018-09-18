import React from 'react'

import FilterSelect from '../../../../sharedResources/components/formik/FilterSelect'
import HeaderFields from './HeaderFields'
import NumberInput from '../../../../sharedResources/components/formik/NumberInput'
import TextInput from '../../../../sharedResources/components/formik/TextInput'
import TextArea from '../../../../sharedResources/components/formik/TextArea'

const Skill = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  headers,
  isSubmitting,
  setFieldValue,
  setFieldTouched,
  touched,
  values
}) => {
  const headerHandler = values => {
    const headers = values.reduce((object, item) => {
      object[item.value] = { hidden: true, trueSkill: false, ...item}
      return object
    }, {})
    setFieldValue('headers', headers)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='small-12 medium-7 small-centered columns'>
          <div className='form-inputs'>
            <TextInput
              error={errors.name}
              touched={touched.name}
              handleBlur={handleBlur}
              handleChange={handleChange}
              label='Name'
              name='name'
              value={values.name}
            />
            <TextArea
              error={errors.description}
              touched={touched.description}
              handleBlur={handleBlur}
              handleChange={handleChange}
              label='Description'
              name='description'
              value={values.description}
            />
            <NumberInput
              error={errors.startingCost}
              touched={touched.startingCost}
              inlineLabel='CP'
              label='Starting Cost'
              name='startingCost'
              values={values.startingCost}
            />
            <div className='row'>
              <div className='small-12 medium-6 columns'>
                <NumberInput
                  error={errors.costIncreaseAmount}
                  touched={touched.costIncreaseAmount}
                  inlineLabel='CP'
                  label='Cost Increases'
                  name='costIncreaseAmount'
                  values={values.costIncreaseAmount}
                />
              </div>
              <div className='small-12 medium-6 columns'>
                <NumberInput
                  error={errors.costIncreaseRank}
                  touched={touched.costIncreaseRank}
                  inlineLabel='Purchases'
                  label='Every'
                  name='costIncreaseRank'
                  values={values.costIncreaseRank}
                />
              </div>
            </div>
            <NumberInput
              error={errors.maxRank}
              touched={touched.maxRank}
              label='Maximum Purchases'
              name='maxRank'
              values={values.maxRank}
            />
            <FilterSelect
              error={errors.headers}
              options={headers}
              label='Headers'
              multi={true}
              name='headers'
              onBlur={setFieldTouched}
              onChange={headerHandler}
              setFieldValue={setFieldValue}
              touched={errors.headers}
              value={Object.values(values.headers)}
            />
            {Object.values(values.headers).map(header => (
              <HeaderFields
                key={header.value}
                errors={errors}
                header={header}
                setFieldValue={setFieldValue}
                touched={touched}
                values={values.headers[`${header.value}`]}
              />
            ))}
          </div>
          <div className='form-actions'>
            <button className='button' type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}


export default Skill
