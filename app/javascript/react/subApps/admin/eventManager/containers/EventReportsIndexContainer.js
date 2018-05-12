import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { authorizeUserRole } from '../../constants/restrictAccess'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class EventReportsIndexContainer extends Component {
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
    if (this.props.isFetching) { return <LoadingSpinner /> }
    const { event, eventSlug } = this.props

    const breadcrumbs = [
      { to: '/admin/events', label: 'Events' },
      { to: `/admin/events/${eventSlug}`, label: event.name}
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Reports' />
          <h1 className='text-center top-padded'>{event.name} Reports</h1>
          <div className='button-group'>
            <a className='button' href={`/admin/events/${this.props.event.slug}/sheets`} target='_blank'>
              <i className='fa fa-print' /> Character Sheets
            </a>
            <Link className='button' to={`/admin/events/${this.props.event.slug}/envelopes`}>
              <i className='fa fa-envelope-open' /> Envelope Stuffing
            </Link>
            <Link className='button' to={`/admin/events/${this.props.event.slug}/self_reports`}>
              <i className='fa fa-medkit' /> Medical Self Reports
            </Link>
            <Link className='button' to={`/admin/events/${this.props.event.slug}/pels`}>
              <i className='fa fa-key' /> PELs
            </Link>
          </div>
          <h3>Downloads</h3>
          <div className='button-group'>
            <a
              className='button'
              href={`/reports/events/${this.props.event.slug}/lodging_questionnaires`}
              target='_blank'
            >
              <i className='fa fa-file-excel-o' /> Lodging Questionnaire Results
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default EventReportsIndexContainer
