import React from 'react'

const Row = props => {
  return(
    <tr>
      <td>
        {props.handle}
      </td>
      <td>
        {props.firstName}
        &nbsp;
        {props.lastName}
      </td>
      <td>
        <a href={`mailto:${props.email}`}>
          {props.email}
        </a>
      </td>
    </tr>
  )
}

export default Row
