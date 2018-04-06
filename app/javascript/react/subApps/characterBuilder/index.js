import React from 'react'
import { Route, Switch } from 'react-router'

import EditBackstory   from './connectors/EditBackstory'
import EditCharacter   from './connectors/EditCharacter'
import IndexCharacters from './connectors/IndexCharacters'
import IndexTallies    from './connectors/IndexTallies'
import NewCharacter    from './connectors/NewCharacter'
import ShowCharacter   from './connectors/ShowCharacter'

const CharacterBuilder = props => {
  return(
    <Switch>
      <Route exact path='/characters' component={IndexCharacters} />
      <Route exact path='/characters/:characterId/backstory' component={EditBackstory} />
      <Route exact path='/characters/new' component={NewCharacter} />
      <Route exact path='/characters/:characterId/build_logs' component={IndexTallies} />
      <Route exact path='/characters/:characterId/edit' component={EditCharacter} />
      <Route exact path='/characters/:characterId' component={ShowCharacter} />
    </Switch>
  )
}

export default CharacterBuilder
