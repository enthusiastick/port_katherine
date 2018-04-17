import React from 'react'
import { Link } from 'react-router-dom'

import LodgingQuestionnaireLink from './LodgingQuestionnaireLink'

const PassList = props => {
  let handleClick = event => {
    if (confirm('Cancel your registration: are you sure?')) {
      props.deleteRegistration(props.userBooking.id)
    }
  }

  let cancellationButton, lodgingQuestionnaireLink, passLinks, registrationOptions

  if (props.userBooking && !props.userBooking.paid) {
    cancellationButton =
      <div className='text-center'>
        <a className='button bottomless' onClick={handleClick}>
          <i className='fa fa-times' />
          &nbsp;Cancel My Registration
        </a>
      </div>
  }

  if (props.passes) {
    passLinks = props.passes.map(pass => {
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
    registrationOptions =
      <div>
        <h5 className='text-center'><Link to={`/events/${props.event}/register`}>Register for This Event</Link></h5>
        <div className='button-group stacked'>
          {passLinks}
          <Link
            className='button'
            to={`/events/${props.event}/volunteer`}
          >
            <span className='float-left'>Volunteer as Staff</span>
            <strong className='float-right'>Free</strong>
          </Link>
        </div>
      </div>
  }

  if (props.eventIsCapped) {
    registrationOptions =
      <div>
        <p className='bottomless text-center'>
          Player passes to this event are
          <strong>
            &nbsp;sold out.&nbsp;
          </strong>
        </p>
        <p className='text-center'>
          Please
          <a className='white' href='mailto:staff@portkatherine.com'>
            &nbsp;contact staff&nbsp;
          </a>
          about our waiting list.
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
  }

  if (props.userBooking) {
    const showLodgingQuestionnaire = (props.showLodgingQuestionnaire && props.userBooking.category === 'player' && !props.userBooking.lodgingQuestionnaireCompletedAt)

    if (showLodgingQuestionnaire) {
      lodgingQuestionnaireLink =
        <div className='text-center'>
          <LodgingQuestionnaireLink eventSlug={props.event} />
        </div>
    }

    registrationOptions =
      <p className='text-center'>
        You
        <strong>
          &nbsp;are&nbsp;
        </strong>
        registered for this event.
      </p>
  }

  return(
    <div className='callout primary'>
      {registrationOptions}
      {lodgingQuestionnaireLink}
      {cancellationButton}
    </div>
  )
}

export default PassList
