import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'

class EventPelShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.eventPels.slug) {
      this.props.getAdminEventPels(this.props.eventSlug)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    let markdownParsedDescription, renderedHTML, pelDiv
    const { eventPels, eventSlug, isFetchingPels, pel, userHandle } = this.props

    if (isFetchingPels) {
      return(
        <div className='text-center top-padded'>
          <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
        </div>
      )
    }

    const breadcrumbs = [
      { to: '/admin/events', label: 'Events' },
      { to: `/admin/events/${eventSlug}`, label: eventPels.name},
      { to: `/admin/events/${eventSlug}/reports`, label: 'Reports'},
      { to: `/admin/events/${eventSlug}/pels`, label: 'PELs'}
    ]

    if (pel.feedback) {
      markdownParsedDescription = marked(pel.feedback)
      renderedHTML = { __html: markdownParsedDescription }
      pelDiv = (
        <div className='callout primary' dangerouslySetInnerHTML={renderedHTML} />
      )
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={userHandle} />
          <h1 className='text-center top-padded'>{pel.userLabel} PEL for {eventPels.name}</h1>
          <div className='row'>
            <div className='small-12 medium-6 columns'>
              <p className='bottomless'>
                <strong>Character:&nbsp;</strong>
                <Link to={`/admin/characters/${pel.characterId}`}>
                  {pel.characterName}
                </Link>
              </p>
            </div>
            <div className='small-12 medium-6 columns'>
              <p className='bottomless'>
                <strong>Submitted At:&nbsp;</strong>{pel.timestampLabel}
              </p>
            </div>
          </div>
          {pelDiv}
        </div>
      </div>

    )
  }
}

export default EventPelShowContainer
