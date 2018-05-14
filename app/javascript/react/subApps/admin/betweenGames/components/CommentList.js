import React from 'react'
import { Link } from 'react-router-dom'

import CommentContainer from '../containers/CommentContainer'

const CommentList = ({bgsId, comments, currentUser, updateAdminBgsComment}) => {
  const commentElements = comments.map(comment => {
    return(
      <CommentContainer
        key={comment.id}
        bgsId={bgsId}
        currentUser={currentUser}
        updateAdminBgsComment={updateAdminBgsComment}
        {...comment}
      />
    )
  })

  return(
    <div>
      <div className='callout bottomless small'>
        <p className='text-center'>
          <i className='fa fa-arrow-circle-down' />
          &nbsp;These comments are <strong>staff-only,</strong>
          &nbsp;and will <strong>not</strong> become visible to players.&nbsp;
          <i className='fa fa-arrow-circle-down' />
        </p>
      </div>
      {commentElements}
    </div>
  )
}

export default CommentList
