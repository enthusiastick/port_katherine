import React from 'react'
import Row from './Row'

const Table = props => {
  let tableRows = props.users.map(user => {
    return(
      <Row key={user.id} {...user} />
    )
  })

  return(
    <table className='hover'>
      <thead>
        <tr>
          <th>
            Handle
          </th>
          <th>
            Name
          </th>
          <th>
            Email
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
