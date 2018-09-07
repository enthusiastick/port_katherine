import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

const HeaderLinks = ({headers}) => {
  const links = headers.map(header =>
    <span key={header.id}><Link to={`/admin/headers/${header.id}`}>
      {header.name}
    </Link><br /></span>
  )

  return(
    <span>
      {links}
    </span>
  )
}

const SkillsTable = ({isFetching, skills}) => {
  if (isFetching) { return <LoadingSpinner /> }

  const tableRows = skills.map(skill => {
    const headerNames = skill.headers.map(header => header.name)

    return(
      <Tr key={skill.id}>
        <Td column='name' value={skill.name}>
          <Link to={`/admin/skills/${skill.id}`}>
            {skill.name}
          </Link>
        </Td>
        <Td column='headers' value={headerNames}>
          <HeaderLinks headers={skill.headers} />
        </Td>
      </Tr>
    )
  })

  return(
    <div>
      <h2 className='text-center'>Skills ({skills.length})</h2>
      <Table
        className='hover'
        filterable={['name', 'headers']}
        itemsPerPage={50}
        noDataText='No matching records found.'
        sortable={true}
      >
        <Thead>
          <Th column='name'>
            Name
          </Th>
          <Th column='headers'>
            Headers
          </Th>
        </Thead>
        {tableRows}
      </Table>
    </div>
  )
}

export default SkillsTable
