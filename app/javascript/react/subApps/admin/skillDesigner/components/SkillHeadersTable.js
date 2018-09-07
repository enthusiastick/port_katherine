import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const SkillHeadersTable = ({headers}) => {
  if (headers.length === 0) { return null }

  const tableRows = headers.map(header => (
      <Tr key={header.id}>
        <Td column='name' value={header.name}>
          <Link to={`/admin/headers/${header.id}`}>
            {header.name}
          </Link>
        </Td>
        <Td column='hidden' data={header.hidden} />
        <Td column='true' data={header.trueSkill} />
      </Tr>
  ))

  return(
    <div>
      <h2>Headers ({headers.length})</h2>
      <Table
        className='hover'
        noDataText='No matching records found.'
        sortable={true}
      >
        <Thead>
          <Th column='name'>
            Name
          </Th>
          <Th column='hidden'>
            Hidden Skill
          </Th>
          <Th column='true'>
            True Skill
          </Th>
        </Thead>
        {tableRows}
      </Table>
    </div>
  )
}

export default SkillHeadersTable
