import React from 'react'
import { Link } from 'react-router-dom'

import EventCharacterSelect from '../components/formFields/EventCharacterSelect'
import LodgingQuestionnaireLink from './LodgingQuestionnaireLink'

const PassList = ({
  deleteRegistration,
  event,
  eventIsCapped,
  match,
  passes,
  showLodgingQuestionnaire,
  userBooking
}) => {
  const handleClick = e => {
    if (confirm('Cancel your registration: are you sure?')) {
      deleteRegistration(userBooking.id)
    }
  }

  let cancellationButton, eventCharacterSelect, lodgingQuestionnaireLink,
    passLinks, registrationOptions

  if (userBooking && !userBooking.paid) {
    cancellationButton =
      <div className='text-center'>
        <a className='button bottomless' onClick={handleClick}>
          <i className='fa fa-times' />
          &nbsp;Cancel My Registration
        </a>
      </div>
  }

  if (userBooking && userBooking.paid) {
    eventCharacterSelect =
      <EventCharacterSelect match={match} />
  }

  if (passes) {
    passLinks = passes.map(pass => {
      return(
        <Link
          className='button' key={pass.slug}
          to={`/events/${event}/register?pass=${pass.slug}`}
        >
          <span className='float-left'>{pass.name}</span>
          <strong className='float-right'>{pass.price}</strong>
        </Link>
      )
    })
    registrationOptions =
      <div>
        <h5 className='text-center'><Link to={`/events/${event}/register`}>Register for This Event</Link></h5>
        <div className='button-group stacked'>
          {passLinks}
          <Link
            className='button'
            to={`/events/${event}/volunteer`}
          >
            <span className='float-left'>Volunteer as Staff</span>
            <strong className='float-right'>Free</strong>
          </Link>
        </div>
      </div>
  }

  if (eventIsCapped) {
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
            to={`/events/${event}/volunteer`}
          >
            Volunteer as Staff
          </Link>
        </div>
      </div>
  }

  if (userBooking) {
    const showLodgingQuestionnaire = (showLodgingQuestionnaire && userBooking.category === 'player' && !userBooking.lodgingQuestionnaireCompletedAt)

    if (showLodgingQuestionnaire) {
      lodgingQuestionnaireLink =
        <div className='text-center'>
          <LodgingQuestionnaireLink eventSlug={event} />
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
      {eventCharacterSelect}
    </div>
  )
}

export default PassList
