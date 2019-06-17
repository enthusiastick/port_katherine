import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const PelsTable = ({handle, pels}) => {
  let tableRows

  if (pels) {
    tableRows = pels.map(pel => (
      <Tr key={pel.eventSlug}>
        <Td column='eventSlug' value={pel.eventSlug}>
          <Link to={`/admin/events/${pel.eventSlug}/pels/${handle}`}>
            {pel.eventName}
          </Link>
        </Td>
        <Td column='characterName' value={pel.characterName}>
          <Link to={`/admin/events/${pel.eventSlug}/pels/${handle}`}>
            {pel.characterName}
          </Link>
        </Td>
        <Td column='timestamp' value={pel.timestamp}>
          <Link to={`/admin/events/${pel.eventSlug}/pels/${handle}`}>
            {pel.timestampLabel}
          </Link>
        </Td>
      </Tr>
    ))
  }

  return(
    <Table
      className='hover'
    >
      <Thead>
        <Th column='eventSlug'>Event</Th>
        <Th column='characterName'>Character</Th>
        <Th column='timestamp'>Submtited At</Th>
      </Thead>
      {tableRows}
    </Table>
  )
}

export default PelsTable
