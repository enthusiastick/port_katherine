import React from 'react'
import Switch from '../../../../sharedResources/components/formik/Switch'

const HeaderFields = ({
  error,
  header,
  setFieldValue,
  touched,
  value
}) => (
  <fieldset className='fieldset'>
    <legend>{header.label}</legend>
    <Switch
      error=''
      label='Hidden'
      name='hidden'
      setFieldValue={setFieldValue}
      touched={false}
      value={true}
    />
  </fieldset>
)

export default HeaderFields
