import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import SkillBox from '../components/SkillBox'

class SkillShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.skill.id !== this.props.skillId) {
      this.props.showAdminSkill(this.props.skillId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    const { isFetching, skill } = this.props
    const { name } = skill

    const breadcrumbs = [
      { to: '/admin/skills', label: 'Headers & Skills' }
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={`Skill: ${name}`} />
          <SkillBox isFetching={isFetching} {...skill} />
        </div>
      </div>
    )
  }
}

export default SkillShowContainer
