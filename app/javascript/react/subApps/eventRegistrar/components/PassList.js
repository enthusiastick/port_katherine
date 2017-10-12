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
        <Link to={`/events/${props.event}/register?pass=${pass.slug}`} className='button' key={pass.slug}>
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
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default PassList
