import React from 'react'

const Progress = ({bookings, isFetching}) => {
  let playerBookings = []
  let percentage = '0%'

  if (bookings && bookings.player) { playerBookings = bookings.player }

  const numerator = playerBookings.filter(booking => { return booking.checkedInAt != null }).length
  const denominator = playerBookings.length

  if (denominator != 0) {
    const calculation = Math.round((numerator / denominator) * 100)
    percentage = `${calculation}%`
  }

  return(
    <div>
      <div className='progress' role='progressbar' tabIndex='0' aria-valuenow='20' aria-valuemin='0' aria-valuetext='25 percent' aria-valuemax='100'>
        <span className='progress-meter' style={{width: percentage}}>
          {!isFetching && <p className='progress-meter-text'>{percentage}</p>}
          {isFetching && <p className='progress-meter-text'><i className='fa fa-spinner fa-pulse' /></p>}
        </span>
      </div>
      <h2>Players ({numerator} / {denominator})</h2>
    </div>
  )
}

export default Progress
