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
    this.state = { editingResponse: false }
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
    let bgsDiv, markdownParsedBody, markdownParsedResponse, renderedBodyHTML,
      renderedResponseHTML
    const { bgs, bgsId, createAdminBgsComment, currentUser, meta,
      hasUpdatedAssignee, isFetching, updateAdminBgsAssignee,
      updateAdminBgsComment, updateAdminBgsResponse } = this.props
    if (isFetching) { return <LoadingSpinner /> }

    const handleToggleEdit = event => {
      this.setState({ editingResponse: !this.state.editingResponse })
    }

    let responseDiv = (
      <div className='button bottomless expanded' onClick={handleToggleEdit}>
        Respond to BGS
      </div>
    )

    const { id, afterEventRelease, assigneeHandle, assigneeLabel,
      beforeEventRelease, body, category, characterId, characterName,
      comments, eventName, eventSlug, isLocked, isVisibleNow,
      respondentHandle, respondentLabel, response, responseTitle,
      responseReleasedAt, submittedAtLabel, title } = bgs

    const breadcrumbs = [
      { to: '/admin/bgs', label: 'Between-Game Skills'}
      ]

    let categoryId = 'after_event'
    let visibleIcon = 'flag-checkered'

    if (responseReleasedAt && responseReleasedAt === beforeEventRelease) {
      categoryId = 'before_event'
      visibleIcon = 'bell'
    }

    if (responseReleasedAt === null) {
      categoryId = 'do_not_reveal'
      visibleIcon = 'eye-slash'
    }

    if (isVisibleNow) {
      categoryId = 'reveal_immediately'
      visibleIcon = 'eye'
    }

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

    const handleCommentSubmit = (values, {resetForm}) => {
      createAdminBgsComment(values)
      resetForm()
    }

    const handleResponseSubmit = values => {
      updateAdminBgsResponse(values)
      this.setState({ editingResponse: false })
    }

    const initialCommentValues = {
      bgsId: bgsId,
      body: ''
    }

    let initialResponseValues = {
      bgsId,
      category: 'after_event',
      response: '',
      responseTitle: 'Response'
    }

    const validateResponse = values => {
      let errors = {}

      if (!values.response) {
        errors.response = 'Response body cannot be blank.'
      }

      if (!values.responseTitle) {
        errors.responseTitle = 'Response title cannot be blank.'
      }

      return errors
    }

    if (response) {
      initialResponseValues = {
        bgsId,
        category: categoryId,
        response,
        responseTitle
      }

      markdownParsedResponse = marked(response)
      renderedResponseHTML = { __html: markdownParsedResponse }
      responseDiv = (
        <div className='bottomless card'>
          <div className='card-divider'>
            <h3 className='bottomless float-center'>
              <i className={`fa fa-${visibleIcon}`} />&nbsp;
              {responseTitle}
            </h3>
            <a
              className='float-right'
              onClick={handleToggleEdit}
            >
              <h3 className='bottomless'>
                <span className='normalized'>Edit </span>
                <i className='fa fa-edit' />
              </h3>
            </a>
          </div>
          <div
            className='card-section'
            dangerouslySetInnerHTML={renderedResponseHTML}
          />
        </div>
      )
    }

    if (this.state.editingResponse) {
      responseDiv = (
        <Formik
          component={ResponseForm}
          onSubmit={handleResponseSubmit}
          initialValues={initialResponseValues}
          validate={validateResponse}
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
            <h2 className='text-center'><BgsIcon category={category} /> {title} {isLocked && <i className='fa fa-lock' />}</h2>
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
