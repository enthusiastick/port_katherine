import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const MerchantsTable = ({characters, meta}) => {
  if (!meta) { return null }

  const tableRows = characters.map(character => {
    return(
      <Tr key={character.id}>
        <Td column='character' value={character.name}>
          <Link to={`/admin/characters/${character.id}`}>
            {character.name}
          </Link>
        </Td>
        <Td column='user' value={character.userLabel}>
          <Link to={`/admin/users/${character.userHandle}`}>
            {character.userLabel}
          </Link>
        </Td>
        <Td className='text-right' column={meta.linkedFirstSkillName} data={character.ranks} />
      </Tr>
    )
  })

  return(
    <Table className='hover' sortable={true}>
      <Thead>
        <Th column='character'>Character</Th>
        <Th column='user'>User</Th>
        <Th column={meta.linkedFirstSkillName}>{meta.linkedFirstSkillName}</Th>
      </Thead>
      {tableRows}
    </Table>
  )
}

export default MerchantsTable
