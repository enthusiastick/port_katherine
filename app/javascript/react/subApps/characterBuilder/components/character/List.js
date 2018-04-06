import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({
  deleteCharacter, id, isDefaultCharacter, name, updateDefaultCharacter
}) => {
  const deleteHandler = () => {
    if (confirm('If you delete this character, any player CP spent on it will be lost. Do you wish to proceed?')) {
      deleteCharacter(id)
    }
  }

  const favoriteHandler = () => {
    if (!isDefaultCharacter) {
      updateDefaultCharacter(id)
    }
  }

  const path = `/characters/${id}`

  return(
    <div className='callout primary'>
      <div className='row'>
        <div className='small-2 medium-1 columns'>
          <a onClick={favoriteHandler}>
            {isDefaultCharacter && <i className='fa fa-heart' />}
            {!isDefaultCharacter && <i className='fa fa-heart-o' />}
          </a>
        </div>
        <Link to={path}>
          <div className='small-8 medium-10 columns'>
            <h5 className='bottomless text-center'>{name}</h5>
          </div>
        </Link>
        <div className='small-2 medium-1 columns'>
          <div className='text-right'>
            <a onClick={deleteHandler}><i className='fa fa-times' /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

const List = ({
  characters,
  defaultCharacterId,
  deleteCharacter,
  playerCpAvailable,
  updateDefaultCharacter
}) => {
  const characterElements = characters.map(character => {
    const isDefaultCharacter = (character.id === defaultCharacterId)

    return(
      <ListItem
        key={character.id}
        deleteCharacter={deleteCharacter}
        isDefaultCharacter={isDefaultCharacter}
        updateDefaultCharacter={updateDefaultCharacter}
        {...character}
      />
    )
  })

  return(
    <div className='row'>
      <div className='small-12 medium-10 large-8 small-centered columns'>
        <div className='text-center'>
          <Link className='button' to='/characters/new'>
            <i className='fa fa-plus' />
            &nbsp;New Character
          </Link>
          <p>
            <strong>Player CP Available:</strong> {playerCpAvailable}
          </p>
        </div>
        <div>
          {characterElements}
        </div>
      </div>
    </div>
  )
}

export default List
