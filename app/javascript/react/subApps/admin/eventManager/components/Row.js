import React from 'react'
import { Link } from 'react-router-dom'

const Row = props => {
  let handleClick = event => {
    if (confirm('Delete this Event: are you sure?')) {
      props.deleteAdminEvent(props.event.slug)
    }
  }

  let showLink = `/admin/events/${props.event.slug}`
  let editLink = showLink + '/edit'

  return(
    <tr>
      <td>
        <Link to={showLink}>
          {props.event.name}
        </Link>
      </td>
      <td>
        {props.event.dates}
      </td>
      {props.isCurrentUserAdmin && <td className='text-right'>
        <Link className='button bottomless' to={editLink}>
          Edit
        </Link>
      </td>}
      {props.isCurrentUserAdmin && <td className='text-right'>
        <a className='button alert bottomless' onClick={handleClick}>
          Delete
        </a>
      </td>}
    </tr>
  )
}

export default Row
