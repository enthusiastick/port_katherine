import React from 'react'
import Row from './Row'

const Table = props => {
  let tableRows = props.events.map(event => {
    return(
      <Row
        key={event.id}
        deleteAdminEvent={props.deleteAdminEvent}
        event={event}
      />
    )
  })

  return(
    <table className='hover'>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Date
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

export default Table
