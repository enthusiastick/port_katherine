import React from 'react'
import { Link } from 'react-router-dom'

import BgsList from './BgsList'

const BgsEvents = props => {
  let events = <p>Loading&hellip;</p>
  let bgs

  if (props.characterBgs) {
    events = props.characterBgs.map(event => {
      return(
        <div key={event.slug}>
          <h3>
            <Link to={`/admin/events/${event.slug}`}>
              {event.name}
            </Link>
          </h3>
          <hr className='bottomless topless' />
          <BgsList bgs={event.bgs} />
        </div>
      )
    })
  }

  return(
    <div>{events}</div>
  )
}

export default BgsEvents
