import React from 'react'

const EventButton = ({event, eventSlug}) => {
  let linkButtonClass = 'button'

  if (event.slug !== eventSlug) { linkButtonClass += ' hollow' }

  return(
    <a
      key={event.slug}
      className={linkButtonClass}
      href={`/admin/events/${event.slug}/bgs`}
    >
      {event.name}
    </a>
  )
}

const EventsNav = ({events, eventSlug}) => {
  if (events.length === 0) { return null }

  const pastEventButtons = events.filter(event => event.past).map(event => 
    <EventButton key={event.slug} event={event} eventSlug={eventSlug} />
  )

  const upcomingEventButtons = events.filter(event => !event.past).map(event => 
    <EventButton key={event.slug} event={event} eventSlug={eventSlug} />
  )

  let homeButtonClass = 'button'

  if (eventSlug) { homeButtonClass += ' hollow' }

  return(
    <div className='small button-group'>
      {pastEventButtons}
      <a className={homeButtonClass} href='/admin/bgs'>
        All Upcoming
      </a>
      {upcomingEventButtons}
    </div>
  )
}

export default EventsNav
