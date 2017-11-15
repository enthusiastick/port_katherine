import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = props => {
  return(
    <div>
      <div className='row'>
        <div className='small-11 small-centered columns'>
          <h1 className='text-center top-padded'>Port Katherine</h1>
          <ul className='menu align-center icons expanded'>
            <li>
              <Link to='/contact'>
                <h3><i className='fa fa-envelope' /><span>&nbsp;Contact</span></h3>
              </Link>
            </li>
            <li>
              <Link to='links'>
                <h3><i className='fa fa-link' /><span>&nbsp;Links</span></h3>
              </Link>
            </li>
            <li>
              <Link to='downloads'>
                <h3><i className='fa fa-book' /><span>&nbsp;Rules</span></h3>
              </Link>
            </li>
            <li>
              <h3><Link to='/values'>
                <i className='fa fa-balance-scale' /><span>&nbsp;Values</span>
              </Link></h3>
            </li>
          </ul>
          <p>
            <span className='header-font'>Port Katherine</span> is an ongoing
            aetherpunk
            <strong>
              &nbsp;live action role playing game (LARP)&nbsp;
            </strong>
            that runs in New England. It has daring combat, devious politics,
            dreadful magic, dangerous monsters, and just about anything our
            players and staff can dream up. It is set in the fictional world
            of the
            <strong>
              &nbsp;Pan-Aetherium,&nbsp;
            </strong>
            on the continent of
            <strong>
              &nbsp;Lithos.
            </strong>
          </p>
          <p>
            <span className='header-font'>Port Katherine</span> runs 4
            weekend-long events each year: 2 in the Spring cycle and 2 in the
            Fall cycle (other LARPs usually refer to these as
            &quot;seasons&quot;; we do not, because seasons are an integral
            part of the <span className='header-font'>Port Katherine </span>
            setting and we wish to avoid confusion.) We occasionally run
            day-long special events in the summer and winter. The game is
            played at a campsite, mostly outdoors. No one under 18 years of
            age may play without staff permission.
          </p>
          <p>
            <span className='header-font'>Port Katherine</span> is a game
            about heroes. The characters exist at a certain time and in a
            certain place when momentous things are happening. Not all
            stories will operate on a cosmic scale, but the actions that each
            person takes will have meaning and can shape the world. Choices
            matter, and the future is yet unwritten.
          </p>
          <h5 className='text-center'>
            Set sail with us, discover your character’s true self, and leave
            your mark upon the Pan-Aetherium.
          </h5>
        </div>
      </div>
    </div>
  )
}

export default HomePage
