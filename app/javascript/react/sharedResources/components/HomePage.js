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
          <ul className='menu icons expanded'>
            <li>
              <Link to='/contact'>
                <h3><i className='fa fa-envelope' /><span>&nbsp;Contact</span></h3>
              </Link>
            </li>
            <li>
              <h3><a href='https://s3-us-west-2.amazonaws.com/portkatherine/rules/Port_Katherine_Rules_v1.0.pdf' target='_blank'>
                <i className='fa fa-book' /><span>&nbsp;Rules</span>
              </a></h3>
            </li>
            <li>
              <h3><Link to='/values'>
                <i className='fa fa-balance-scale' /><span>&nbsp;Values</span>
              </Link></h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
