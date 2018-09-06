import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

const SkillsTable = ({isFetching, skills}) => {
  if (isFetching) { return <LoadingSpinner /> }

  const tableRows = skills.map(skill => {
    return(
      <Tr key={skill.id}>
        <Td column='name' value={skill.name}>
          <Link to={`/admin/skills/${skill.id}`}>
            {skill.name}
          </Link>
        </Td>
      </Tr>
    )
  })

  return(
    <Table
      className='hover'
      filterable={['name']}
      itemsPerPage={50}
      noDataText='No matching records found.'
      sortable={true}
    >
      <Thead>
        <Th column='name'>
          Name
        </Th>
      </Thead>
      {tableRows}
    </Table>
  )
}

export default SkillsTable
