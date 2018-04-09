import React from 'react'
import { Link } from 'react-router-dom'

import ForumPosts from './ForumPosts'
import NextEventCounter from './NextEventCounter'

const HomepageText = ({isFetchingForumPosts, nextEvent, posts}) => {
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
          <div className='callout primary large'>
            <NextEventCounter {...nextEvent} />
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
            <h5 className='text-center'>
              Set sail with us, discover your character’s true self, and leave
              your mark upon the Pan-Aetherium.
            </h5>
          </div>
          <ForumPosts
            isFetchingForumPosts={isFetchingForumPosts}
            posts={posts}
          />
        </div>
      </div>
    </div>
  )
}

export default HomepageText
