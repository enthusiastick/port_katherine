import React from 'react'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const TalliesTable = props => {
  let rows

  if (props.tallies) {
    rows = props.tallies.map(tally => {
      return(
        <Tr key={tally.id}>
          <Td column='datetime' data={tally.timestamp} />
          <Td column='description' data={tally.summary} />
          <Td column='remaining' data={tally.annotation} />
        </Tr>
      )
    })
  }

  return(
    <div>
      <Table
        className='hover'
        itemsPerPage={props.itemsPerPage}
        sortable={true}
      >
        <Thead>
          <Th column='datetime'>
            Date/Time
          </Th>
          <Th column='description'>
            Description
          </Th>
          <Th column='remaining'>
            Remaining
          </Th>
        </Thead>
        {rows}
      </Table>
    </div>
  )
}

export default TalliesTable
