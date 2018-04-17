import marked from 'marked'
import React from 'react'
import { Link } from 'react-router-redux'

import PassList from './PassList'

const Event = props => {
  let markdownParsedDescription, renderedHTML, whosComing
  if (props.description) {
    markdownParsedDescription = marked(props.description)
    renderedHTML = { __html: markdownParsedDescription }
  }

  if (props.whosComing) {
    whosComing = `(${props.whosComing.length}) ${props.whosComing.join(', ')}`
  }

  return(
    <div className='row'>
      <div className='small-12 columns'>
        <div className='text-center top-padded'>
          <h1>{props.name}</h1>
          <h3>{props.dates}</h3>
        </div>
        <div className='row'>
          <div className='small-10 medium-7 large-5 small-centered columns'>
            <PassList
              eventIsCapped={props['capped?']}
              deleteRegistration={props.deleteRegistration}
              event={props.slug}
              passes={props.passes}
              userBooking={props.userBooking}
              showLodgingQuestionnaire={props.showLodgingQuestionnaire}
            />
          </div>
        </div>
        <div className='row'>
          <div className='small-11 medium-10 large-9 small-centered columns'>
            <p>
              <strong>
                Who&apos;s Coming?
              </strong>
              &nbsp;{whosComing}
            </p>
            <div className='callout' id='mapCanvas' />
            <p className='text-center'>
              <strong>
                Address:
              </strong>
              &nbsp;
              <a href={`https://www.google.com/maps/search/${props.address}`} target='_blank'>
                {props.address}
              </a>
            </p>
            <div className='callout secondary' dangerouslySetInnerHTML={renderedHTML} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event
