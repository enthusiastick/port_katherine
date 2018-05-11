import React from 'react'
import { Link } from 'react-router-dom'

const NextEventCounter = ({bgsDeadlineInWords, distanceOfTimeInWordsToNow, name, slug, timeAgoInWords}) => {
  let bgsDeadline
  let className = 'large text-center'

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

  if (bgsDeadlineInWords) {
    bgsDeadline = <p className='text-center'>The BGS deadline is in {bgsDeadlineInWords}.</p>
    className += ' bottomless'
  }

  return(
    <div>
      <p className={className}>{text}</p>
      {bgsDeadline}
    </div>
  )

}

export default NextEventCounter
