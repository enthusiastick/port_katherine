import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const SkillCharactersTable = ({characters}) => {
  if (characters.length === 0) { return null }

  const tableRows = characters.map(character => (
    <Tr key={character.id}>
      <Td column='name' value={character.name}>
        <Link to={`/admin/characters/${character.id}`}>
          {character.name}
        </Link>
      </Td>
      <Td column='locked' data={character.locked} />
      <Td className='text-right' column='ranks' data={character.ranks} />
    </Tr>
  ))

  return(
    <div>
      <h2>Characters ({characters.length})</h2>
      <Table
        className='hover'
        defaultSort={{column: 'name'}}
        itemsPerPage={25}
        noDataText='No matching records found.'
        sortable={true}
      >
        <Thead>
          <Th column='name'>
            Name
          </Th>
          <Th column='locked'>
            Locked
          </Th>
          <Th column='ranks'>
            Ranks
          </Th>
        </Thead>
        {tableRows}
      </Table>
    </div>
  )
}

export default SkillCharactersTable
