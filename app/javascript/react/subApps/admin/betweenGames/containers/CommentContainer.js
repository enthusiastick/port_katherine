import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import validateComment from '../constants/validateComment'
import marked from 'marked'

import CommentForm from '../forms/Comment'

class CommentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timestamp !== this.props.timestamp) {
      this.setState({ editing: false })
    }
  }

  clickHandler(event) {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    const { automated, bgsId, body, commentId, currentUser,
      editedAt, id, postedAt, updateAdminBgsComment, userHandle,
      userLabel } = this.props

    let bodyElement = <span>&nbsp;{body}</span>
    let className = 'bottomless callout'
    let editButton

    if (currentUser.handle === userHandle && !this.state.editing) {
      editButton =
        <span className='button bottomless small' onClick={this.clickHandler}>
          Edit
        </span>
    }

    let postedDiv =
      <p className='bottomless dark-gray small text-right'>
        {postedAt}
        &nbsp;{editButton}
      </p>

    if (automated) { className += ' small' }

    if (!automated) {
      const markdownParsedBody = marked(body)
      const renderedHTML = { __html: markdownParsedBody }
      bodyElement = <div className='left-margin-spacer' dangerouslySetInnerHTML={renderedHTML} />
    }

    if (editedAt) {
      postedDiv =
        <p className='bottomless dark-gray small text-right'>
          <em>Edited {editedAt}</em>
          &nbsp;{editButton}
        </p>
    }

    let bodyDiv =
      <div>
        <strong>
          <Link to={`/admin/users/${userHandle}`}>
            {userLabel}:
          </Link>
        </strong>
        {bodyElement}
        {postedDiv}
      </div>

    if (this.state.editing) {
      const handleSubmit = values => {
       updateAdminBgsComment(values)
      }

      const initialCommentValues = {
        bgsId,
        body,
        id
      }

      return(
        <Formik
          component={CommentForm}
          onSubmit={handleSubmit}
          initialValues={initialCommentValues}
          validate={validateComment}
        />
      )
    }

    return(
      <div className={className}>
        {bodyDiv}
      </div>
    )
  }
}


export default CommentContainer
