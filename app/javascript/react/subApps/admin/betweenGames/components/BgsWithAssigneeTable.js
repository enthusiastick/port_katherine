import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

import BgsIcon from '../../../../sharedResources/components/BgsIcon'

const BgsWithAssigneeTable = ({bgs}) => {
  const tableRows = bgs.map(betweenGame => {
    const {
      id,
      assigneeLabel,
      category,
      characterId,
      characterName,
      eventName,
      eventSlug,
      isAnswered,
      submittedAt,
      submittedAtLabel,
      title
    } = betweenGame

    return(
      <Tr key={id}>
        <Td column='title' value={title}>
          <Link to={`/admin/bgs/${id}`}>
            <BgsIcon category={category} /> {title}
          </Link>
        </Td>
        <Td column='event' value={eventName}>
          <Link to={`/admin/events/${eventSlug}`}>{eventName}</Link>
        </Td>
        <Td column='character' value={characterName}>
          <Link to={`/admin/characters/${characterId}`}>{characterName}</Link>
        </Td>
        <Td column='submittedAt' value={submittedAt}>
          {submittedAtLabel}
        </Td>
        <Td column='assignee' data={assigneeLabel} />
        <Td column='isAnswered' value={isAnswered ? 'answered' : 'incomplete'}>
          {isAnswered ? <i className='fa fa-check' /> : <i className='fa fa-times' />}
        </Td>
      </Tr>
    )
  })

  return(
    <Table
      className='hover'
      filterable={['event', 'character', 'title', 'isAnswered']}
      itemsPerPage={100}
      noDataText='No matching records found.'
      sortable={true}
    >
      <Thead>
        <Th column='title'>
          Title
        </Th>
        <Th column='event'>
          Event
        </Th>
        <Th column='character'>
          Character
        </Th>
        <Th column='submittedAt'>
          Submitted At
        </Th>
        <Th column='assignee'>
          Assigned To
        </Th>
        <Th column='isAnswered'>
          Answered?
        </Th>
      </Thead>
      {tableRows}
    </Table>
  )
}

export default BgsWithAssigneeTable
