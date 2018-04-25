import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import SelfReport from '../components/SelfReport'

class EventSelfReportsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.event.slug) {
      this.props.getAdminEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    const { isFetching, event, eventSlug } = this.props

    const breadcrumbs = [
      { to: '/admin/events', label: 'Events' },
      { to: `/admin/events/${eventSlug}`, label: event.name},
      { to: `/admin/events/${eventSlug}/reports`, label: 'Reports' }
    ]

    let bookings = { player: [], staff: [] }

    if (event.bookings) { bookings = event.bookings }

    const playerSelfReports = bookings.player.map(player => {
      if (!player.selfReport) {
        return null
      }

      return(
        <SelfReport
          key={player.id}
          handle={player.userHandle}
          label={player.user}
          selfReport={player.selfReport}
        />
      )
    })

    const staffSelfReports = bookings.staff.map(staffer => {
      if (!staffer.selfReport) {
        return null
      }

      return(
        <SelfReport
          key={staffer.id}
          handle={staffer.userHandle}
          label={staffer.user}
          selfReport={staffer.selfReport}
        />
      )
    })

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Self Reports' />
          <h1 className='text-center top-padded'>{event.name} Self Reports</h1>
          <div className='row'>
            <div className='small-11 medium-10 large-9 small-centered columns'>
              <div className='text-center'>
                <h3>Players</h3>
                {isFetching && <i className='fa fa-spinner fa-pulse fa-lg fa-fw' />}
              </div>
              {playerSelfReports}
              <div className='text-center'>
                <h3>Staff</h3>
                {isFetching && <i className='fa fa-spinner fa-pulse fa-lg fa-fw' />}
              </div>
              {staffSelfReports}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventSelfReportsIndexContainer
