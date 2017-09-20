import React from 'react'
import { Link } from 'react-router-dom'

const NavigationButton = props => {
  let buttonClass = 'button'
  let iconClass = 'fa fa-' + props.icon
  let to = '/' + props.url

  if (to === props.currentPath) {
    buttonClass += ' navy'
  }

  return(
    <Link className={buttonClass} to={to}>
      <i className={iconClass} />
      &nbsp;
      {props.label}
    </Link>
  )
}

export default NavigationButton
