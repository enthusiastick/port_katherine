import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

import landownerSkills from '../constants/landownerSkills'
import vialSkills from '../constants/vialSkills'

const SkillIcon = ({boolean}) => {
  const icon = boolean ? 'check' : 'times'
  return <i className={`fa fa-${icon}`} />
}

const EnvelopesTable = ({characters}) => {
  const tableRows = characters.map(character => {
    const characterHasCheckboxSkill = (skillName, skills = character.skills) => {
      return skills[skillName] != undefined && skills[skillName] === 1
    }
    const skillRanks = (skillName, skills = character.skills) => {
      return skills[skillName] != undefined ? skills[skillName] : 0
    }

    const hasIncome = characterHasCheckboxSkill('income')
    const hasMilitaryOfficer = characterHasCheckboxSkill('militaryOfficer')
    const hasDayLaborer = characterHasCheckboxSkill('dayLaborIncome')

    const landownerListItems = landownerSkills.map(skill => {
      if (skillRanks(skill.value) !== 0) {
        return <li key={skill.value}><strong>{skill.label}:</strong> {skillRanks(skill.value)}</li>
      }
    })

    const vialListItems = vialSkills.map(skill => {
      if (skillRanks(skill.value) !== 0) {
        return <li key={skill.value}><strong>{skill.label}:</strong> {skillRanks(skill.value)}</li>
      }
    })

    return(
      <Tr key={character.id}>
        <Td column='character' value={character.name}>
          <Link to={`/admin/characters/${character.id}`}>
            {character.name}
          </Link>
        </Td>
        <Td column='user' value={character.userName}>
          <Link to={`/admin/users/${character.userHandle}`}>
            {character.userName}
          </Link>
        </Td>
        <Td column='income' value={hasIncome}>
          <SkillIcon boolean={hasIncome} />
        </Td>
        <Td column='militaryOfficer' value={hasMilitaryOfficer}>
          <SkillIcon boolean={hasMilitaryOfficer} />
        </Td>
        <Td column='dayLaborer' value={hasDayLaborer}>
          <SkillIcon boolean={hasDayLaborer} />
        </Td>
        <Td column='landowner'>
          <ul>
            {landownerListItems}
          </ul>
        </Td>
        <Td column='vials'>
          <ul>
            {vialListItems}
          </ul>
        </Td>
      </Tr>
    )
  })

  return(
    <Table className='hover' sortable={true}>
      <Thead>
        <Th column='character'>Character</Th>
        <Th column='user'>User</Th>
        <Th column='income'>Income</Th>
        <Th column='dayLaborer'>Day Laborer</Th>
        <Th column='militaryOfficer'>Military Officer</Th>
        <Th column='landowner'>Landowner</Th>
        <Th column='vials'>Vials</Th>
      </Thead>
      {tableRows}
    </Table>
  )
}

export default EnvelopesTable
