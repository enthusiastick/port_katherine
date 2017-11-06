import React from 'react'

const Banner = props => {
  let toggleHeaderButton, title

  let handleAddHeader = () => {
    props.addHeader(props.headerId)
  }

  let handleRemoveHeader = () => {
    props.removeHeader(props.headerId)
  }

  if (props.deltaNewHeaders.includes(props.headerId)) {
    toggleHeaderButton =
      <span className='button secondary float-right' onClick={handleRemoveHeader}>
        <i className='fa fa-minus' /> Remove Header
      </span>
  } else if (!props.characterHeaderId) {
    toggleHeaderButton =
      <span className='button secondary float-right' onClick={handleAddHeader}>
        <i className='fa fa-plus' /> Add Header
      </span>
  }

  if (props.trueHeader) {
    title = `True ${props.name}`
  } else {
    title = props.name
  }

  return(
    <div className='card-divider'>
      <h4 className='float-center'>{title}</h4>
      {toggleHeaderButton}
    </div>
  )
}

export default Banner
