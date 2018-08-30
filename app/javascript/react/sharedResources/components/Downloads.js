import React from 'react'

const Downloads = props => {
  return(
    <div>
      <div className='row'>
        <div className='small-11 medium-9 large-7 small-centered columns'>
          <h1 className='text-center top-padded'>Rulebooks</h1>
          <a href='https://s3.us-west-2.amazonaws.com/portkatherine/rules/Port_Katherine_Rules_v1.2.pdf' target='_blank'>
            <h3 className='text-center'>
              <i className='fa fa-book' />&nbsp;Rulebook (version 1.2)
            </h3>
          </a>
          <h1 className='text-center'>Supplements</h1>
          <a href='https://s3-us-west-2.amazonaws.com/portkatherine/supplements/Port_Katherine_approved_blaster_types_v1.1.pdf' target='_blank'>
            <h3 className='text-center'>
              <i className='fa fa-file-text' /> Approved Blaster Types
            </h3>
          </a>
          <h2 className='text-center'>Culture Packets</h2>
          <div className='row'>
            <div className='small-8 medium-6 large-4 small-centered columns'>
              <a href='https://s3-us-west-2.amazonaws.com/portkatherine/supplements/cultures/Chepstone+Culture+Packet.pdf' target='_blank'>
                <p className='large'>
                  <i className='fa fa-external-link' /> Chepstone
                </p>
              </a>
              <a href='https://s3-us-west-2.amazonaws.com/portkatherine/supplements/cultures/Drevnia+Culture+Packet.pdf' target='_blank'>
                <p className='large'>
                  <i className='fa fa-external-link' /> Drevnia
                </p>
              </a>
              <a href='https://s3-us-west-2.amazonaws.com/portkatherine/supplements/cultures/Tojima+Culture+Packet.pdf' target='_blank'>
                <p className='large'>
                  <i className='fa fa-external-link' /> Tojima
                </p>
              </a>
              <a href='https://s3-us-west-2.amazonaws.com/portkatherine/supplements/cultures/Zlota+Culture+Packet.pdf' target='_blank'>
                <p className='large'>
                  <i className='fa fa-external-link' /> Zlota
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Downloads
