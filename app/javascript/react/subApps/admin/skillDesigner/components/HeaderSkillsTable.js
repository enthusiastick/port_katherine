import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const HeaderSkillsTable = ({skills}) => {
  if (skills.lenth === 0) { return null }

  const tableRows = skills.map(skill => (
    <Tr key={skill.id}>
      <Td column='name' value={skill.name}>
        <Link to={`/admin/skills/${skill.id}`}>
          {skill.name}
        </Link>
      </Td>
      <Td column='hidden' data={skill.hidden} />
      <Td column='true' data={skill.trueSkill} />
    </Tr>
  ))

  return(
    <div>
      <h2>Skills ({skills.length})</h2>
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

export default HeaderSkillsTable
