import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BgsTable from '../components/BgsTable'
import BgsWithAssigneeTable from '../components/BgsWithAssigneeTable'
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

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
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

    let selectedBgsTable = <BgsTable bgs={this.props[`${this.state.selected}`]} />

    if (this.state.selected === 'allBgs') {
      selectedBgsTable = <BgsWithAssigneeTable bgs={this.props[`${this.state.selected}`]} />
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='text-center'>
            <h1 className='top-padded'>Between-Games Skills</h1>
            <Link className='button large' to='/admin/bgs/new'>
              <i className='fa fa-plus' />
              &nbsp;Add BGS
            </Link>
          </div>
          <EventsNav events={events} eventSlug={eventSlug} />
          <div className='button-group bottomless expanded'>
            {navigationButtons}
          </div>
          {selectedBgsTable}
        </div>
      </div>
    )
  }
}

export default BgsIndexContainer
