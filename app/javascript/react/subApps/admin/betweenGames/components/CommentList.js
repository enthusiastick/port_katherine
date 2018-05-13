import React from 'react'
import { Link } from 'react-router-dom'

const Comment = ({automated, body, commentId, editedAt, postedAt, userHandle, userLabel}) => {
  let className = 'bottomless callout'
  let postedDiv =
    <p className='bottomless dark-gray small text-right'>
      {postedAt}
    </p>

  if (automated) { className += ' small' }
  if (editedAt) {
    postedDiv =
    <p className='bottomless dark-gray small text-rigt'>
      <em>Edited {editedAt}</em>
    </p>
  }

  return(
    <div className={className}>
      <strong>
        <Link to={`/admin/users/${userHandle}`}>
          {userLabel}:
        </Link>
      </strong>
      &nbsp;{body}
      {postedDiv}
    </div>
  )
}

const CommentList = ({comments}) => {
  const commentElements = comments.map(comment => {
    return <Comment key={comment.id} {...comment} />
  })

  return(
    <div>
      {commentElements}
    </div>
  )
}

export default CommentList
