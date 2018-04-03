import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = props => {
  const path = `/characters/${props.id}`

  return(
    <div className='button-group'>
      <Link className='button' to={path}>
        {props.name}
      </Link>
      <a className='button'>
        <i className='fa fa-times' />
      </a>
    </div>
  )
}

export default ListItem
