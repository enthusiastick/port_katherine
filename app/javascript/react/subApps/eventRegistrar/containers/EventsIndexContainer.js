import React, { Component } from 'react'

import EventTile from '../components/EventTile'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.events.length === 0 && !this.props.isFetchingEvents) {
      this.props.getEvents()
    }
  }

  render() {
    let loadingBug
    const { events, isFetchingEvents } = this.props

    if (isFetchingEvents) {
      loadingBug = <div className='callout secondary'><div className='text-center'><h3>Loading&hellip;</h3><p className='bottomless'>Please wait.</p></div></div>
    }

    const eventTiles = events.map(event => {
      return <EventTile key={event.slug} {...event} />
    })

    return (
      <div className='row'>
        <div className='small-11 medium-7 small-centered columns'>
          <div className='text-center'>
            <h1 className='top-padded'>Port Katherine</h1>
            <h3>Upcoming Events</h3>
            {loadingBug}
            {eventTiles}
          </div>
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer
