import React from 'react'
import { Route, Switch } from 'react-router'

import SkillsIndex from './connectors/SkillsIndex'

const SkillDesigner = () => (
  <Switch>
    <Route exact path='/admin/skills' component={SkillsIndex} />
  </Switch>
)

export default SkillDesigner
