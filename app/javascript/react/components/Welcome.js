import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = props => {
  let lastLine

  if (props.currentUser.id) {
    lastLine = <p>Welcome back, {props.currentUser.firstName}.</p>
  } else {
    lastLine = <p>If you're new to <strong>Polity</strong>, you can <Link to='/sign-up'>sign up here.</Link></p>
  }

  return(
    <div className='row'>
      <div className='small-12 columns'>
        <h1 className='text-center top-padded'>
          Polity
        </h1>
        <div className='callout'>
          <p>
            <strong>Polity</strong> is the single sign-on provider for all apps hosted at enthusiastick.io &ndash; your one user account here at <strong>Polity</strong> is used to authenticate you to sites, experiments and web-toys found throughout the domain.
          </p>
          {lastLine}
        </div>
      </div>
    </div>
  )
}

export default Welcome
