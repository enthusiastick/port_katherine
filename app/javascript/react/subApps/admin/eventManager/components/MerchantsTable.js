import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const MerchantsTable = ({characters}) => {
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
        <Td className='text-right' column='lots' data={character.lots} />
      </Tr>
    )
  })

  return(
    <Table className='hover' sortable={true}>
      <Thead>
        <Th column='character'>Character</Th>
        <Th column='user'>User</Th>
        <Th column='lots'>Lots</Th>
      </Thead>
      {tableRows}
    </Table>
  )
}

export default MerchantsTable
