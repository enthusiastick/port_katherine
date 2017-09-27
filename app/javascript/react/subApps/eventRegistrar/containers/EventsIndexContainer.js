import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.events.length == 0) {
      this.props.getEvents()
    }
  }

  render() {
    let eventTiles

    if (this.props.events.length == 0) {
      eventTiles = <div className='callout secondary'><div className='text-center'><h3>No events currently scheduled.</h3><p className='bottomless'>Check back soon!</p></div></div>
    } else {
      eventTiles = this.props.events.map(event => {
        return(
          <div className='callout secondary' key={event.slug}>
            <div className='text-center'>
              <h3>
                <Link to={`/events/${event.slug}`}>
                  {event.name}
                </Link>
              </h3>
              <p className='bottomless'>
                {event.dates}
              </p>
            </div>
          </div>
        )
      })
    }

    return(
      <div className='row'>
        <div className='small-11 medium-7 small-centered columns'>
          <div className='text-center'>
            <h1 className='top-padded'>Port Katherine</h1>
            <h3>Upcoming Events</h3>
            {eventTiles}
          </div>
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer
