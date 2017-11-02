import React from 'react'

const Resources = props => {
  return(
    <div>
      <div className='row'>
        <div className='small-11 medium-9 large-7 small-centered columns'>
          <h1 className='text-center top-padded'>Links</h1>
          <a href='https://www.facebook.com/portkatherine' target='_blank'>
            <h3>
              <i className='fa fa-facebook-square' />&nbsp;Connect with Us on Facebook
            </h3>
          </a>
          <a href='https://www.pinterest.com/adriantatro/port-katherine-costuming' target='_blank'>
            <h3>
              <i className='fa fa-pinterest-square' />&nbsp;Find Inspiration on Pinterest
            </h3>
          </a>
          <a href='https://www.pinterest.com/thebackseatphil/pk-fashion' target='_blank'>
            <h3>
              <i className='fa fa-pinterest-square' />&nbsp;More Pinterest Inspiration
            </h3>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Resources
