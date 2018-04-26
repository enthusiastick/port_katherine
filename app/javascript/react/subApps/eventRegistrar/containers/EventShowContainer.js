import React, { Component } from 'react'

import initMapWithAMarker from '../../../sharedResources/constants/initMapWithAMarker'

import Event from '../components/Event'

class EventShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.event.slug) {
      this.props.getEvents()
    }
  }

  componentDidMount() {
    let mapCanvas = document.getElementById('mapCanvas')
    if (this.props.event && this.props.event.latitude && this.props.event.longitude && mapCanvas) {
      initMapWithAMarker(mapCanvas, this.props.event.latitude, this.props.event.longitude, 15)
    }
  }

  render() {
    let mapCanvas = document.getElementById('mapCanvas')
    if (this.props.event && this.props.event.latitude && this.props.event.longitude && mapCanvas) {
      initMapWithAMarker(mapCanvas, this.props.event.latitude, this.props.event.longitude, 15)
    }

    return(
      <Event
        deleteRegistration={this.props.deleteRegistration}
        match={this.props.match}
        {...this.props.event}
      />
    )
  }
}

export default EventShowContainer
