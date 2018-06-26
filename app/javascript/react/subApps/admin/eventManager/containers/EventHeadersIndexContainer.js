import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import HeadersNav from '../components/HeadersNav'
import HeadersTable from '../components/HeadersTable'

class EventHeadersIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: '' }
    this.navigationHandler = this.navigationHandler.bind(this)
  }

  componentDidMount() {
    if (this.props.eventHeaders.characters.length === 0) {
      this.props.getAdminEventHeaders(this.props.eventSlug)
    }
    if (!this.props.headers.profession) {
      this.props.getHeaders()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  navigationHandler(event) {
    const headerId = event.currentTarget.id

    this.setState({ selected: headerId })
    this.props.getAdminEventHeaders(this.props.eventSlug, headerId)
  }

  render() {
    const { getAdminEventHeaders, eventHeaders, eventSlug, headers,
      isFetchingHeaders } = this.props
    const { characters, meta } = eventHeaders

    if (eventHeaders.characters.length === 0 && isFetchingHeaders) { return <LoadingSpinner /> }

    let breadcrumbs = [{ to: '/admin/events', label: 'Events' }]

    if (meta) {
      breadcrumbs.push({ to: `/admin/events/${eventSlug}`, label: meta.eventName})
      breadcrumbs.push({ to: `/admin/events/${eventSlug}/reports`, label: 'Reports'})
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Headers' />
          <div className='callout warning'>
            <p>
              <strong>Warning:</strong> The contents of this report are
              current, <em>not</em> historical. That is to say, they represent
              characters as they <em>currently are</em> in the database,
              <em>not</em> as they were at the time of the event.
            </p>
          </div>
          <h1 className='text-center top-padded'>{meta && `${meta.eventName} ${meta.headerName}`} ({eventHeaders.characters.length})</h1>
          <HeadersNav
            headers={headers}
            navigationHandler={this.navigationHandler}
            selected={this.state.selected}
          />
          <HeadersTable characters={characters} meta={meta} />
        </div>
      </div>
    )
  }
}

export default EventHeadersIndexContainer
