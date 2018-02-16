import React from 'react'
import { Link } from 'react-router-dom'

const PassList = props => {
  let handleClick = event => {
    if (confirm('Cancel your registration: are you sure?')) {
      props.deleteRegistration(props.userBooking.id)
    }
  }

  let cancellationButton

  if (props.userBooking && !props.userBooking.paid) {
    cancellationButton =
      <div className='text-center'>
        <a className='button bottomless' onClick={handleClick}>
          <i className='fa fa-times' />
          &nbsp;Cancel My Registration
        </a>
      </div>
  }

  if (props.eventIsCapped) {
    return(
      <div className='callout primary'>
        <p className='text-center'>
          Player passes to this event are
          <strong>
            &nbsp;sold out.
          </strong>
        </p>
        <div className='button-group stacked'>
          <Link
            className='button'
            to={`/events/${props.event}/volunteer`}
          >
            Volunteer as Staff
          </Link>
        </div>
      </div>
    )
  } else if (props.userBooking) {
    return(
      <div className='callout primary'>
        <p className='text-center'>
          You
          <strong>
            &nbsp;are&nbsp;
          </strong>
          registered for this event.
        </p>
        {cancellationButton}
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
