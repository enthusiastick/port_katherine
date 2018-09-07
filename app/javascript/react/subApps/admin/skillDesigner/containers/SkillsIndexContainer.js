import React, { Component } from 'react'
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
          <h1 className='text-center'>Headers & Skills</h1>
          <SkillsTable isFetching={isFetching} skills={skills} />
        </div>
      </div>
    )
  }
}

export default SkillsIndexContainer
