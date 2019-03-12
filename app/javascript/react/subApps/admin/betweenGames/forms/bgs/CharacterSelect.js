import React from 'react'

import FilterSelect from '../../../../../sharedResources/components/formik/FilterSelect'
import LoadingSpinner from '../../../../../sharedResources/components/LoadingSpinner'

const BgsCharacterSelect = ({
  error,
  selectedEvent,
  selectedCharacter,
  fetchedEvent,
  setFieldTouched,
  setFieldValue,
  touched
}) => {
  if (selectedEvent && (selectedEvent.value !== fetchedEvent.slug)) {
    return <LoadingSpinner />
  }

  if (Object.keys(fetchedEvent).length === 0) {
    return null
  }

  const options = fetchedEvent.bookings.player.filter(booking => booking.character.id).map(booking => ( { label: `${booking.character.name} (${booking.userFullName})`, value: booking.character.id } ))

  return(
    <fieldset>
      <FilterSelect
        error={error}
        label='Character'
        options={options}
        multi={false}
        name='character'
        onBlur={setFieldTouched}
        setFieldValue={setFieldValue}
        touched={touched}
        value={selectedCharacter}
      />
    </fieldset>
  )
}

export default BgsCharacterSelect
