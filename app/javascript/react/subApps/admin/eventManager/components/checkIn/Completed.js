import React from 'react'

const Completed = ({bookings, deleteCheckIn, handleDeleteClick}) => {
  const handleClick = e => {
    handleDeleteClick(e.currentTarget.value)
  }

  let playerBookings = []

  if (bookings) { playerBookings = bookings.player }

  const checkedInTotal = playerBookings.filter(booking => { return booking.checkedInAt != null }).length

  const checkedInPlayers = playerBookings.map(booking => {
    if (!booking.checkedInAt) { return null }

    return(
      <div className='callout small' key={booking.id}>
        <button className='close-button' aria-label='Undo alert' onClick={handleClick} type='button' value={booking.id}>
          <span aria-hidden='true'>&times;</span>
        </button>
        <p className='strikethrough'>{booking.user}</p>
      </div>
    )
  })

  return(
    <div>
      {checkedInTotal > 0 && <h1>{checkedInTotal} Checked In</h1>}
      <div className='row'>
        <div className='small-10 medium-8 large-6 columns end'>
          {checkedInPlayers}
        </div>
      </div>
    </div>
  )
}

export default Completed
