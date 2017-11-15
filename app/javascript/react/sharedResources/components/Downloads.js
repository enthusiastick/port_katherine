import React from 'react'

const Downloads = props => {
  return(
    <div>
      <div className='row'>
        <div className='small-11 medium-9 large-7 small-centered columns'>
          <h1 className='text-center top-padded'>Rulebooks</h1>
          <a href='https://s3-us-west-2.amazonaws.com/portkatherine/rules/Port_Katherine_Rules_v1.0.pdf' target='_blank'>
            <h3>
              <i className='fa fa-book' />&nbsp;Rulebook (version 1.0)
            </h3>
          </a>
          <h1 className='text-center'>Supplements</h1>
          <a href='https://s3.us-west-2.amazonaws.com/portkatherine/supplements/Port_Katherine_approved_blaster_types.pdf' target='_blank'>
            <h3>
              <i className='fa fa-file-text' /> Approved Blaster Types
            </h3>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Downloads
