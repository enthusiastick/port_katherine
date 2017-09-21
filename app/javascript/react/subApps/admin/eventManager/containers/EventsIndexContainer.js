import React, { Component } from 'react'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getAdminEvents()
  }

  render() {
    let eventsList = this.props.adminEvents.map(event => { return(<li key={event.id}>{event.name}</li>) })

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Events</h1>
          <ul>
            {eventsList}
          </ul>
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer
