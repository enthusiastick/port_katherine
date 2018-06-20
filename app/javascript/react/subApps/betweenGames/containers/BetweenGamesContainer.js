import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LoadingSpinner from '../../../sharedResources/components/LoadingSpinner'

import NavButton from '../components/NavButton'
import SelectedBooking from '../components/SelectedBooking'

class BetweenGamesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
    this.navigationHandler = this.navigationHandler.bind(this)
  }

  componentDidMount() {
    if (this.props.pastBookings.length === 0) {
      this.props.getBetweenGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  navigationHandler(event) {
    this.setState({ selected: event.currentTarget.id })
  }

  render() {
    const { isFetching, futureBookings, meta, pastBookings } = this.props
    let bgsDeadline

    if (isFetching) { return <LoadingSpinner /> }

    if (meta.bgsDeadlineInWords) {
      const { name, slug, bgsDeadlineInWords } = meta
      bgsDeadline = (
        <p>The BGS deadline for&nbsp;
          <Link className='header-font' to={`/events/${slug}`}>{name}</Link>
          &nbsp;is in {bgsDeadlineInWords}.</p>
      )
    }

    const pastBookingsNavButtons = pastBookings.map(booking =>
      <NavButton
        key={booking.id}
        handler={this.navigationHandler}
        id={booking.eventSlug}
        label={booking.label}
        selected={this.state.selected}
      />
    )

    const futureBookingsNavButtons = futureBookings.map(booking =>
      <NavButton
        key={booking.id}
        handler={this.navigationHandler}
        id={booking.eventSlug}
        label={booking.label}
        selected={this.state.selected}
      />
    )

    const bookingsNavButtons = pastBookingsNavButtons.concat(futureBookingsNavButtons)

    const allBookings = pastBookings.concat(futureBookings)

    const selectedBooking = allBookings.filter(booking => { return booking.eventSlug === this.state.selected })[0]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='text-center'>
            <h1 className='top-padded'>Between-Game Skills & Post-Event Letters</h1>
            {bgsDeadline}
          </div>
          <div className='row'>
            <div className='small-9 medium-6 large-3 small-centered columns'>
              <div className='button-group expanded'>
                <Link className='button' to='/bgs/new'>
                  <i className='fa fa-plus' /> Submit BGS
                </Link>
                <Link className='button' to='/pels/new'>
                  <i className='fa fa-plus' /> Submit a PEL
                </Link>
              </div>
            </div>
          </div>
          <div className='grid-container'>
            <div className='grid-x medium-grid-frame-y'>
              <div className='cell small-12 medium-6 large-3 medium-cell-block-y'>
                <div className='button-group expanded stacked'>
                  {bookingsNavButtons}
                </div>
              </div>
              <div className='card cell small-12 medium-6 large-9 medium-cell-block-y'>
                <SelectedBooking booking={selectedBooking} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BetweenGamesContainer
