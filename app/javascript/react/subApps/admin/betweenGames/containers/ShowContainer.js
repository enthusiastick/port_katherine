import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

import AssigneeSelector from '../components/AssigneeSelector'
import BgsIcon from '../../../../sharedResources/components/BgsIcon'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import CommentList from '../components/CommentList'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.bgs.id !== this.props.bgsId) {
      this.props.showAdminBgs(this.props.bgsId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    let markdownParsedDescription, renderedHTML, bgsDiv
    const { bgs, meta, hasUpdatedAssignee, isFetching,
      updateAdminBgsAssignee } = this.props
    if (isFetching) { return <LoadingSpinner /> }

    const { id, assigneeHandle, assigneeLabel, body, category, characterId,
      characterName, comments, eventName, eventSlug, submittedAtLabel,
      title } = bgs

    const breadcrumbs = [
      { to: '/admin/bgs', label: 'Between-Game Skills'}
      ]

    if (body) {
      markdownParsedDescription = marked(body)
      renderedHTML = { __html: markdownParsedDescription }
      bgsDiv = (
        <div dangerouslySetInnerHTML={renderedHTML} />
      )
    }

    const changeHandler = event => {
      updateAdminBgsAssignee({ bgsId: id, userHandle: event.currentTarget.value })
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={title} />
          <AssigneeSelector
            assigneeHandle={assigneeHandle}
            hasUpdatedAssignee={hasUpdatedAssignee}
            onChange={changeHandler}
            users={meta.users}
          />
          <div className='bottomless callout primary'>
            <div className='row'>
              <div className='small-12 medium-4 columns'>
                <p className='bottomless'>
                  <strong>Character: </strong>
                  <Link to={`/admin/characters/${characterId}`}>
                    {characterName}
                  </Link>
                </p>
              </div>
              <div className='small-12 medium-4 columns'>
                <p className='bottomless text-center'>
                  <strong>Event: </strong>
                  <Link to={`/admin/events/${eventSlug}`}>
                    {eventName}
                  </Link>
                </p>
              </div>
              <div className='small-12 medium-4 columns'>
                <p className='bottomless text-right'>
                  <strong>Submitted At: </strong>
                  {submittedAtLabel}
                </p>
              </div>
            </div>
            <hr className='topless' />
            <h2 className='text-center'><BgsIcon category={category} /> {title}</h2>
            {bgsDiv}
          </div>
          <CommentList comments={comments} />
        </div>
      </div>
    )
  }
}

export default BgsShowContainer
