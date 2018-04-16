import React from 'react'
import { Link } from 'react-router-dom'

const LodgingQuestionnaireLink = ({eventSlug}) => {
  return(
    <p className='bottomless'>
      <strong>
        <Link className='button bottomless' to={`/events/${eventSlug}/lodging-questionnaire`}>
          <i className='fa fa-home' /> Fill out Your Lodging Questionnaire
        </Link>
      </strong>
    </p>
  )
}

export default LodgingQuestionnaireLink
