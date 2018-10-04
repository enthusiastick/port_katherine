import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SkillsTable from '../components/SkillsTable'

class SkillsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.skills.length === 0) {
      this.props.getAdminSkills()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    const { isFetching, skills } = this.props

    return(
      <div className='row'>
        <div className='small-12 columns top-padded'>
          <div className='text-center'>
            <h1>Headers & Skills</h1>
            <Link to='/admin/skills/new' className='button large'>
              <i className='fa fa-plus' />
              &nbsp;Add New Skill
            </Link>
          </div>
          <SkillsTable isFetching={isFetching} skills={skills} />
        </div>
      </div>
    )
  }
}

export default SkillsIndexContainer
