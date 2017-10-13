import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = props => {
  return(
    <div>
      <div className='row'>
        <div className='small-11 small-centered columns'>
          <h1 className='text-center top-padded'>Port Katherine</h1>
          <p>
            <strong>
              Port Katherine&nbsp;
            </strong>
            is a new weekend-long boffer larp launching in May of 2018, to be run out of Camp Middlesex in Ashby, Massachusetts (about an hour and a half northwest of Boston).
          </p>
        </div>
        <div className="bottomless button-group expanded stacked-for-small">
          <Link className='button' to='/contact'>
              <i className='fa fa-envelope' /> Contact
            </Link>
            <a className='button' href='https://s3-us-west-2.amazonaws.com/portkatherine/rules/Port_Katherine_Rules_v1.0.pdf' target='_blank'>
              <i className='fa fa-book' /> Rules
            </a>
            <Link className='button' to='/values'>
              <i className='fa fa-balance-scale' /> Values
            </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
