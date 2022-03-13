import React from 'react'

const LimitedRegistrationWarning = ({name, unlimitedRegistrationDate}) => {
  return (unlimitedRegistrationDate) ?
    (
      <div className='row top-padded'>
        <div className='small-12 medium-10 large-8 small-centered columns'>
          <div className='callout large warning'>
            <h1 className='text-center'>Limited Registration</h1>
            <p>
              Registration to <strong>{name}</strong> will be opened to the
              public on <strong>{unlimitedRegistrationDate}</strong>. For now,
              only those community members who previously registered for the
              cancelled events in 2020 may register.
            </p>
            <p>
              If you believe there is an error (for example, you <em>were</em>
              &nbsp;registered for one of those events, but are still unable to register),
              please contact staff.&nbsp;
              <a href='mailto:staff@portkatherine.com'>
                <i className='fa fa-envelope' />
              </a>
            </p>
          </div>
        </div>
      </div>
    )
    :
    (
      <div className='row top-padded'>
        <div className='small-12 medium-10 large-8 small-centered columns'>
          <div className='callout large warning'>
            <h1 className='text-center'>Limited Registration</h1>
            <p>
              Registration to <strong>{name}</strong> is currently limited to
              community members who attended one of our two preceding
              full-weekend events.
            </p>
            <p>
              If you believe there is an error (for example, you <em>did</em>
              &nbsp;attend one of those events, but are still unable to register),
              please contact staff.&nbsp;
              <a href='mailto:staff@portkatherine.com'>
                <i className='fa fa-envelope' />
              </a>
            </p>
          </div>
        </div>
      </div>
    )
}

export default LimitedRegistrationWarning
