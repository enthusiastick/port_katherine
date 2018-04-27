import React from 'react'

const CheckInForm = ({handleSubmit, isSubmitting}) => {
  return(
    <form onSubmit={handleSubmit}>
      <button className='bottomless button' type='submit' disabled={isSubmitting}>
        Check In
      </button>
    </form>
  )
}

export default CheckInForm
