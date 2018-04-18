import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { authorizeUserRole } from '../../constants/restrictAccess'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'

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
          </div>
            <Link className='button' to={`/admin/events/${this.props.event.slug}/envelopes`}>
              <i className='fa fa-envelope-open' /> Envelope Stuffing
            </Link>
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
