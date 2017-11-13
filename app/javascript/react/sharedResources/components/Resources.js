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
          <h1 className='text-center'><i className='fa fa-google' />oogle Docs</h1>
          <a href='https://docs.google.com/document/d/1OagOMEWg6QZ2ZwCPnY9meqEs980EPius3wGvytP53_U' target='_blank'>
            <h3>
              <i className='fa fa-file-text' /> Costuming Guide
            </h3>
          </a>
          <a href='https://docs.google.com/document/d/1iYLYDeuuOI8OUN0kpzKm9N0Vdfi6oahHaWAYxCp0LvQ' target='_blank'>
            <h3>
              <i className='fa fa-file-text' /> Advanced Header Paths
            </h3>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Resources
