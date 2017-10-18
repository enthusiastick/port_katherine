import React from 'react'
import { Link } from 'react-router-dom'

const PassList = props => {
  if (props.userBooking) {
    return(
      <div className='callout primary'>
        <p className='text-center'>
          You
          <strong>
            &nbsp;are&nbsp;
          </strong>
          registered for this event.
        </p>
      </div>
    )
  } else if (props.passes && props.passes.length != 0) {
    let passes = props.passes.map(pass => {
      return(
        <Link
          className='button' key={pass.slug}
          to={`/events/${props.event}/register?pass=${pass.slug}`}
        >
          <span className='float-left'>{pass.name}</span>
          <strong className='float-right'>{pass.price}</strong>
        </Link>
      )
    })

    return(
      <div className='callout primary'>
        <h5 className='text-center'><Link to={`/events/${props.event}/register`}>Register for This Event</Link></h5>
        <div className='button-group stacked'>
          {passes}
          <Link
            className='button'
            to={`/events/${props.event}/volunteer`}
          >
            <span className='float-left'>Volunteer as Staff</span>
            <strong className='float-right'>Free</strong>
          </Link>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default PassList
