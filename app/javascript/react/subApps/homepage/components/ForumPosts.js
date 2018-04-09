import React from 'react'

const Post = props => {
  const imageSrc = `${process.env.FORUMS_URL}${props.avatarTemplate.replace('{size}', '45')}`
  const profileLink = `${process.env.FORUMS_URL}/users/${props.username}`
  const postLink = `${process.env.FORUMS_URL}/t/${props.topicSlug}/${props.topicId}/${props.postNumber}`

  return(
    <p>
      <a className='header-font' href={profileLink}>
        <img className='forum-avatar' src={imageSrc} />
        {props.username}
      </a>
      &nbsp;on&nbsp;
      <a className='header-font' href={postLink}>
        {props.topicTitle}
      </a>
    </p>
  )
}

const ForumPosts = ({isFetchingForumPosts, posts}) => {
  const postElements = posts.slice(0,8).map(post => {
    return(
      <Post key={post.id} {...post} />
    )
  })

  return(
    <div>
      <h3>Recent Forum Posts</h3>
      {isFetchingForumPosts && <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />}
      {postElements}
    </div>
  )
}

export default ForumPosts
