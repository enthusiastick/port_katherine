import marked from 'marked'
import React from 'react'
import { Link } from 'react-router-redux'

import MapWithAMarker from '../../../sharedResources/components/MapWithAMarker'

const Event = props => {
  let markdownParsedDescription, renderedHTML
  if (props.description) {
    markdownParsedDescription = marked(props.description)
    renderedHTML = { __html: markdownParsedDescription }
  }

  return(
    <div className='row'>
      <div className='small-12 columns'>
        <div className='text-center top-padded'>
          <h1>{props.name}</h1>
          <h3>{props.dates}</h3>
        </div>
        <div className='row'>
          <div className='small-11 medium-10 large-9 small-centered columns'>
            <MapWithAMarker latitude={props.latitude} longitude={props.longitude} zoom={15} />
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
