import React from 'react'

const EventsNav = ({events, eventSlug}) => {
  if (events.length === 0) { return null }

  const eventButtons = events.map(event => {
    let linkButtonClass = 'button'

    if (event.slug !== eventSlug) { linkButtonClass += ' clear' }

    return(
      <a
        key={event.slug}
        className={linkButtonClass}
        href={`/admin/events/${event.slug}/bgs`}
      >
        {event.name}
      </a>
    )
  })

  let homeButtonClass = 'button'

  if (eventSlug) { homeButtonClass += ' clear' }

  return(
    <div className='button-group'>
      <a className={homeButtonClass} href='/admin/bgs'>
        All
      </a>
      {eventButtons}
    </div>
  )
}

export default EventsNav
