import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = props => {
  const path = `/characters/${props.id}`

  return(
    <li>
      <Link to={path}>
        {props.name}
      </Link>
    </li>
  )
}

export default ListItem
