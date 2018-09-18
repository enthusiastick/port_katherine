import React from 'react'
import Switch from '../../../../sharedResources/components/formik/Switch'

const HeaderFields = ({
  error,
  header,
  setFieldValue,
  touched,
  values
}) => (
  <fieldset className='fieldset'>
    <legend>{header.label}</legend>
    <Switch
      label='Hidden'
      name={`headers.${header.value}.hidden`}
      setFieldValue={setFieldValue}
      touched={touched.hidden}
      value={values.hidden}
    />
    <Switch
      label='True Skill'
      name={`headers.${header.value}.trueSkill`}
      setFieldValue={setFieldValue}
      touched={touched.trueSkill}
      values={values.trueSkill}
    />
  </fieldset>
)

export default HeaderFields
