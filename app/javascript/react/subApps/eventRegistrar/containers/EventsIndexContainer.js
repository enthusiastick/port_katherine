import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const EventTile = props => {
  let linkTo = `/events/${props.slug}`
  let registerLink = `${linkTo}/register`
  let volunteerLink = `${linkTo}/volunteer`

  if (props.userBooking) {
    return(
      <div className='callout secondary' key={props.slug}>
        <div className='text-center'>
          <h3>
            <Link to={linkTo}>
              {props.name}
              <span>&nbsp;<i className='fa fa-check' /></span>
            </Link>
          </h3>
          <p className='bottomless'>
            {props.dates}
          </p>
        </div>
      </div>
    )
  } else {
    return(
      <div className='callout secondary' key={props.slug}>
        <div className='text-center'>
          <h3>
            <Link to={linkTo}>
              {props.name}
            </Link>
          </h3>
          <p>
            {props.dates}
          </p>
          <p className='bottomless'>
            <strong>
              <Link className='button bottomless' to={volunteerLink}>Volunteer</Link>
              &nbsp;
              <Link className='button bottomless' to={registerLink}>Register</Link>
            </strong>
          </p>
        </div>
      </div>
    )
  }
}

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
      eventTiles = <div className='callout secondary'><div className='text-center'><h3>Loading&hellip;</h3><p className='bottomless'>Please wait.</p></div></div>
    } else {
      eventTiles = this.props.events.map(event => {
        if (event.slug) {
          return(<EventTile key={event.slug} {...event} />)
        }
      })
    }

    if (this.props.events.isFetching) {
      return null
    } else {
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
}

export default EventsIndexContainer
