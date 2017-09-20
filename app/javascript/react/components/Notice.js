import React from 'react'

const Notice = props => {
  return(
    <div className={`callout ${props.name}`} data-closable=''>
      {props.message}
      <button className="close-button" aria-label="Dismiss alert" type="button" data-close=''>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default Notice
