import React from 'react'
import { Link } from 'react-router-dom'

const NavigationButton = props => {
  let buttonClass = 'button'
  const iconClass = 'fa fa-' + props.icon
  let to = '/' + props.url

  if (props.url.includes('http')) {
    to = props.url

    return(
      <a className={buttonClass} href={to}>
        <i className={iconClass} />
        &nbsp;
        {props.label}
      </a>
    )
  } else {
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

}

export default NavigationButton
