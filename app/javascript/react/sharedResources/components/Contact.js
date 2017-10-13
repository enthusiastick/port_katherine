import React from 'react'

const Contact = props => {
  return(
    <div className='row'>
      <div className='small-11 small-centered columns'>
        <h1 className='text-center top-padded'>Contact</h1>
        <div className='button-group stacked'>
          <a className='button' href='mailto:director@portkatherine.com'>
            <i className='fa fa-envelope' />
            &nbsp;Contact the Game Director:
            <span className='header-font'>
              &nbsp;Brian M
            </span>
          </a>
          <a className='button' href='mailto:staff@portkatherine.com'>
            <i className='fa fa-envelope' />
            &nbsp;Contact the Staff:
            <span className='header-font'>
              &nbsp;Adrian T, Brian M, Eben L, Haley B-E
            </span>
          </a>
          <a className='button' href='mailto:conduct@portkatherine.com'>
            <i className='fa fa-envelope' />
            &nbsp;Contact the Conduct Committee
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
