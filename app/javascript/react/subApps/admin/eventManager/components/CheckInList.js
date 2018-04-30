import React from 'react'
import { Formik } from 'formik'
import humps from 'humps'

import CheckIn from './CheckIn'

const CheckInList = ({bookings, characters, createCheckIn}) => {
  const handleSubmit = values => {
    createCheckIn(values)
  }

  let playerBookings = []

  if (bookings) { playerBookings = bookings.player }

  const checkInRows = playerBookings.map(booking => {
    if (booking.checkedInAt) { return null }

    const initialValues = {
      id: booking.id,
      characterId: booking.character.id
    }

    const camelizedUserHandle = humps.camelize(booking.userHandle)
    const playerCharacters = characters[camelizedUserHandle]

    return(
      <Formik
        key={booking.id}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={formikProps => (
          <CheckIn
            playerCharacters={playerCharacters}
            user={booking.user}
            userHandle={booking.userHandle}
            {...formikProps}
          />
        )}
      />
    )
  })

  return(
    <div>
      {checkInRows}
    </div>
  )
}

export default CheckInList
