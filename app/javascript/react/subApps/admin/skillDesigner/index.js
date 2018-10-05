import React from 'react'
import { Route, Switch } from 'react-router'

import HeaderShow from './connectors/HeaderShow'

import EditSkill   from './connectors/EditSkill'
import NewSkill    from './connectors/NewSkill'
import SkillShow   from './connectors/SkillShow'
import SkillsIndex from './connectors/SkillsIndex'

const SkillDesigner = () => (
  <div>
    <Switch>
      <Route exact path='/admin/headers/:headerId' component={HeaderShow} />
    </Switch>
    <Switch>
      <Route exact path='/admin/skills' component={SkillsIndex} />
      <Route exact path='/admin/skills/new' component={NewSkill} />
      <Route exact path='/admin/skills/:skillId' component={SkillShow} />
      <Route exact path='/admin/skills/:skillId/edit' component={EditSkill} />
    </Switch>
  </div>
)

export default SkillDesigner
