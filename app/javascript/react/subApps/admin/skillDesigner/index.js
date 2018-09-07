import React from 'react'
import { Route, Switch } from 'react-router'

import HeaderShow from './connectors/HeaderShow'

import SkillShow   from './connectors/SkillShow'
import SkillsIndex from './connectors/SkillsIndex'

const SkillDesigner = () => (
  <div>
    <Switch>
      <Route exact path='/admin/headers/:headerId' component={HeaderShow} />
    </Switch>
    <Switch>
      <Route exact path='/admin/skills' component={SkillsIndex} />
      <Route exact path='/admin/skills/:skillId' component={SkillShow} />
    </Switch>
  </div>
)

export default SkillDesigner
