import React from 'react'

const Banner = props => {
  let title

  if (props.trueHeader) {
    title = `True ${props.name}`
  } else {
    title = props.name
  }

  return(
    <div className='card-divider'>
      <h4 className='float-center'>{title}</h4>
    </div>
  )
}

export default Banner
