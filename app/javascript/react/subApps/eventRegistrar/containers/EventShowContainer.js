import React, { Component } from 'react'

import Event from '../components/Event'

class EventShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug && !this.props.event) {
      this.props.getEvents()
    }
  }

  render() {
    return(
      <Event {...this.props.event} />
    )
  }
}

export default EventShowContainer
