import React, { Component } from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import marked from 'marked'

import AssigneeSelector from '../components/AssigneeSelector'
import BgsIcon from '../../../../sharedResources/components/BgsIcon'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import CommentForm from '../forms/Comment'
import CommentList from '../components/CommentList'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import ResponseForm from '../forms/Response'
import validateComment from '../constants/validateComment'

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
    let markdownParsedBody, renderedBodyHTML, bgsDiv
    let responseDiv = <div className='button bottomless expanded'>This is a button</div>
    const { bgs, bgsId, createAdminBgsComment, currentUser, meta,
      hasUpdatedAssignee, isFetching, updateAdminBgsAssignee,
      updateAdminBgsComment } = this.props
    if (isFetching) { return <LoadingSpinner /> }

    const { id, assigneeHandle, assigneeLabel, body, category, characterId,
      characterName, comments, eventName, eventSlug, respondentHandle,
      respondentLabel, response, responseTitle, responseReleasedAt,
      submittedAtLabel, title } = bgs

    const breadcrumbs = [
      { to: '/admin/bgs', label: 'Between-Game Skills'}
      ]

    if (body) {
      markdownParsedBody = marked(body)
      renderedBodyHTML = { __html: markdownParsedBody }
      bgsDiv = (
        <div dangerouslySetInnerHTML={renderedBodyHTML} />
      )
    }

    const handleChange = event => {
      updateAdminBgsAssignee({ bgsId: id, userHandle: event.currentTarget.value })
    }

    const handleCommentSubmit = values => {
      createAdminBgsComment(values)
    }

    const handleResponseSubmit = values => {
      debugger
    }

    const initialCommentValues = {
      bgsId: bgsId,
      body: ''
    }

    let initialResponseValues = {
      responseTitle: 'Response'
    }

    if (response) {
      initialResponseValues = {
        responseTitle
      }

      responseDiv = (
        <Formik
          component={ResponseForm}
          onSubmit={handleResponseSubmit}
          initialValues={initialResponseValues}
        />
      )
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={title} />
          <AssigneeSelector
            assigneeHandle={assigneeHandle}
            hasUpdatedAssignee={hasUpdatedAssignee}
            onChange={handleChange}
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
          {responseDiv}
          <CommentList
            bgsId={bgsId}
            comments={comments}
            currentUser={currentUser}
            updateAdminBgsComment={updateAdminBgsComment}
          />
          <Formik
            component={CommentForm}
            onSubmit={handleCommentSubmit}
            initialValues={initialCommentValues}
            validate={validateComment}
          />
        </div>
      </div>
    )
  }
}

export default BgsShowContainer
