import React, { Component } from 'react'

import BgsTable from '../components/BgsTable'
import EventsNav from '../components/EventsNav'
import NavButton from '../components/NavButton'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'unansweredBgsAssignedToCurrentUser'
    }
    this.navigationHandler = this.navigationHandler.bind(this)
  }

  componentWillMount() {
    if (this.props.allBgs.length === 0) {
      this.props.getAdminBgs(this.props.eventSlug)
    }
  }

  navigationHandler(event) {
    this.setState({ selected: event.currentTarget.id })
  }

  render() {
    const { allBgs, answeredBgs, bgsAssignedToCurrentUser, bgsUnassigned,
      events, eventSlug, unansweredBgsAssignedToCurrentUser, isFetching } = this.props
    if (isFetching) { return <LoadingSpinner /> }

    const navigation = [
      { id: 'unansweredBgsAssignedToCurrentUser', label: `Unanswered & Assigned To Me (${unansweredBgsAssignedToCurrentUser.length})`},
      { id: 'bgsAssignedToCurrentUser', label: `Assigned To Me (${bgsAssignedToCurrentUser.length})` },
      { id: 'bgsUnassigned', label: `Unassigned (${bgsUnassigned.length})` },
      { id: 'allBgs', label: `All (${allBgs.length})` }
    ]

    const navigationButtons = navigation.map(button => {
      return(
        <NavButton
          key={button.id}
          handler={this.navigationHandler}
          selected={this.state.selected}
          {...button}
        />
      )
    })

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Between-Games Skills</h1>
          <EventsNav events={events} eventSlug={eventSlug} />
          <div className='button-group bottomless expanded'>
            {navigationButtons}
          </div>
          <BgsTable bgs={this.props[`${this.state.selected}`]} />
        </div>
      </div>
    )
  }
}

export default BgsIndexContainer
