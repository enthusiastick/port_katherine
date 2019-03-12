import React from 'react'

import CategoryRadioButtons from '../../../../../subApps/betweenGames/forms/CategoryRadioButtons'
import TextArea from '../../../../../sharedResources/components/formik/TextArea'
import TextInput from '../../../../../sharedResources/components/formik/TextInput'

const BgsTitleAndBody = ({
  bodyError,
  bodyTouched,
  bodyValue,
  categoryValue,
  handleBlur,
  handleChange,
  selectedCharacter,
  selectedEvent,
  titleError,
  titleTouched,
  titleValue
}) => {
  if (selectedCharacter && selectedEvent) {
    if (!selectedCharacter.value || !selectedEvent.value) {
      return null
    }
  }

  return(
    <div>
      <CategoryRadioButtons
        handleChange={handleChange}
        value={categoryValue}
      />
      <TextInput
        error={titleError}
        touched={titleTouched}
        handleBlur={handleBlur}
        handleChange={handleChange}
        label='Title'
        name='title'
        value={titleValue}
      />
      <TextArea
        disabled
        error={bodyError}
        touched={bodyTouched}
        handleBlur={handleBlur}
        handleChange={handleChange}
        name='body'
        value={bodyValue}
      />
    </div>
  )
}

export default BgsTitleAndBody
