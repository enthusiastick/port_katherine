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
          <h5>
            <Link to={`/admin/events/${event.slug}`}>
              <i className='fa fa-key' />
              &nbsp;
              {event.name}
            </Link>
          </h5>
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
