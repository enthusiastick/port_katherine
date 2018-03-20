import React from 'react'

const Button = props => {
  const availableHeaderIds = props.availableHeaders.map(header => header.headerId)

  let handleAddHeader = () => {
    props.addHeader(props.headerId)
  }

  let handleRemoveHeader = () => {
    props.removeHeader(props.headerId)
  }

  if (props.delta.newHeaders.includes(props.headerId)) {
    return(
      <a
        className='button bg-solarized-yellow'
        onClick={handleRemoveHeader}
      >
        <i className='fa fa-minus' />
        &nbsp;{props.name}
      </a>
    )
  }

  if (!availableHeaderIds.includes(props.headerId)) {
    return(
      <a className='button hollow'>
        {props.name}
      </a>
    )
  }

  return(
    <a
      className='button'
      onClick={handleAddHeader}
    >
      <i className='fa fa-plus' />
      &nbsp;{props.name}
    </a>
  )
}

export default Button
