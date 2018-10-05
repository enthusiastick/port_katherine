import React, { Component } from 'react'
import { Formik } from 'formik'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import { default as SkillForm } from '../forms/Skill'
import validateSkill from '../constants/validateSkill'

class EditSkillContainer extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.skill.id !== this.props.skillId) {
      this.props.editAdminSkill(this.props.skillId)
    }
    if (this.props.headers.length === 0) {
      this.props.getAdminHeaders()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  onSubmit(values) {
    this.props.updateAdminSkill(values)
  }

  render() {
    const { isFetching, headers, skill, skillId } = this.props

    if (isFetching) { return <LoadingSpinner /> }

    const { name } = skill

    const breadcrumbs = [
      { to: '/admin/skills', label: 'Headers & Skills' },
      { to: `/admin/skills/${skillId}`, label: `Skill: ${name}` }
    ]

    const initialValues = { ...skill }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Edit' />
          <h1 className='text-center top-padded'>Edit {name}</h1>
          {initialValues.id && <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            validate={validateSkill}
            render={formikProps => (
              <SkillForm
                headers={headers.map(header => ({ label: header.name, value: header.id }))}
                {...formikProps}
              />
            )}
          />}
        </div>
      </div>
    )
  }
}

export default EditSkillContainer
