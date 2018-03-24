import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const CharactersTable = props => {
  let tableRows

  if (props.characters) {
    tableRows = props.characters.map(character => {
      return(
        <Tr key={character.id}>
          <Td column='name'>
            <Link to={`/admin/characters/${character.id}`}>
              {character.name}
            </Link>
          </Td>
          <Td column='birthplace' data={character.birthplace} />
          <Td column='firstTrueHeader' data={character.firstTrueHeader} />
          <Td column='firstProfession' data={character.firstProfession} />
          <Td column='available' data={character.available} />
          <Td column='spent' data={character.spent} />
          <Td column='hasBackstory' data={character.hasBackstory} />
        </Tr>
      )
    })
  }

  return(
    <Table
      className='hover'
    >
      <Thead>
        <Th column='name'>Name</Th>
        <Th column='birthplace'>Culture</Th>
        <Th column='firstTrueHeader'>1st Header</Th>
        <Th column='firstProfession'>1st Profession</Th>
        <Th column='available'>CP Available</Th>
        <Th column='spent'>CP Spent</Th>
        <Th column='hasBackstory'>Backstory?</Th>
      </Thead>
      {tableRows}
    </Table>
  )
}

export default CharactersTable
