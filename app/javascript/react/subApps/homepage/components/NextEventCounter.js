import React from 'react'
import { Link } from 'react-router-dom'

const NextEventCounter = ({distanceOfTimeInWordsToNow, name, slug, timeAgoInWords}) => {
  let text =
    <strong>
      {distanceOfTimeInWordsToNow} until&nbsp;
      <Link to={`/events/${slug}`}>
        <span className='header-font'>{name}</span>.
      </Link>
    </strong>

  if (!name) {
    return null
  }

  if (!distanceOfTimeInWordsToNow && timeAgoInWords) {
    text =
      <strong>
        <Link to={`/events/${slug}`}>
          <span className='header-font'>{name}</span>
        </Link>
        &nbsp;is going on now! It began {timeAgoInWords} ago.
      </strong>
  }

  return <p className='large text-center'>{text}</p>
}

export default NextEventCounter
