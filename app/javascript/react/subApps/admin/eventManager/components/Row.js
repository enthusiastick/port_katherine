import React from 'react'
import { Link } from 'react-router-dom'

const Row = props => {
  const handleClick = event => {
    if (confirm('Delete this Event: are you sure?')) {
      props.deleteAdminEvent(props.event.slug)
    }
  }

  const showLink = `/admin/events/${props.event.slug}`
  const editLink = showLink + '/edit'
  const reportLink = showLink + '/reports'

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
      <td className='text-right'>
        <Link className='button bottomless' to={reportLink}>
          <i className='fa fa-folder-open' /> Reports
        </Link>
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
