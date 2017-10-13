import React from 'react'

const License = props => {
  return(
    <div className='row'>
      <div className='small-12 columns'>
        <div className='text-center'>
          <hr />
          <a href='http://creativecommons.org/licenses/by/3.0/deed.en_US' rel='license'>
            <img alt='Creative Commons License' src='https://i.creativecommons.org/l/by/3.0/80x15.png' />
          </a>
          <p>
            The works associated with Port Katherine by
            <a href='https://www.redfeatheroleplaying.com/' target='_blank'>
              &nbsp;Red Feather Roleplaying, Inc&nbsp;
            </a>
            are licensed under a
            <a href='http://creativecommons.org/licenses/by/3.0/deed.en_US' target='_blank'>
              &nbsp;Creative Commons Attribution 3.0 Unported License.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default License
