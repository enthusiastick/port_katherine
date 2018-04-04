import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({ deleteCharacter, id, name }) => {
  const deleteHandler = () => {
    if (confirm('If you choose to archive this character, any player CP spent on it will NOT be recovered. Do you wish to proceed?')) {
      deleteCharacter(id)
    }
  }

  const path = `/characters/${id}`

  return(
    <div className='callout primary'>
      <div className='row'>
        <div className='small-2 medium-1 columns'>
          <a><i className='fa fa-heart' /></a>
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

const List = props => {
  const characters = props.characters.map(character => {
    return(
      <ListItem
        key={character.id}
        deleteCharacter={props.deleteCharacter}
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
        </div>
        <div>
          {characters}
        </div>
      </div>
    </div>
  )
}

export default List
