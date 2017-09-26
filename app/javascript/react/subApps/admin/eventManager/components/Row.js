import React from 'react'
import { Link } from 'react-router-dom'

const Row = props => {
  let handleClick = event => {
    if (confirm('Delete this Event: are you sure?')) {
      props.deleteAdminEvent(props.event.slug)
    }
  }

  return(
    <tr>
      <td>
        <Link to={`/admin/events/${props.event.slug}/edit`}>
          {props.event.name}
        </Link>
      </td>
      <td>
        {props.event.dates}
      </td>
      <td className='text-right'>
        <a className='button alert bottomless' onClick={handleClick}>
          Delete
        </a>
      </td>
    </tr>
  )
}

export default Row
