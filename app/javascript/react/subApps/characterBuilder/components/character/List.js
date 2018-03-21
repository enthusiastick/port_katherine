import React from 'react'
import { Link } from 'react-router-dom'

import ListItem from './ListItem'

const List = props => {
  let characters = props.characters.map(character => {
    return(<ListItem key={character.id} {...character} />)
  })

  return(
    <div className='row'>
      <div className='small-11 medium-7 large-3 small-centered columns'>
        <div className='text-center'>
          <Link className='button' to='/characters/new'>
            <i className='fa fa-plus' />
            &nbsp;New Character
          </Link>
        </div>
        <ul className='bottomless'>
          {characters}
        </ul>
      </div>
    </div>
  )
}

export default List
