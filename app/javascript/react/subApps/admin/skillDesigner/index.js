import React from 'react'
import { Route, Switch } from 'react-router'

import SkillShow   from './connectors/SkillShow'
import SkillsIndex from './connectors/SkillsIndex'

const SkillDesigner = () => (
  <Switch>
    <Route exact path='/admin/skills' component={SkillsIndex} />
    <Route exact path='/admin/skills/:skillId' component={SkillShow} />
  </Switch>
)

export default SkillDesigner
