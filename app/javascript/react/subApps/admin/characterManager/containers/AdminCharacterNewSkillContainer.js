import React, { Component } from 'react'
import { Formik } from 'formik'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import { default as HiddenSkillsForm } from '../forms/HiddenSkills'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class AdminCharacterNewSkillContainer extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.meta.characterId !== this.props.characterId) {
      this.props.getAdminAvailableSkills(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  onSubmit(values, {resetForm}) {
    const { characterId } = this.props
    const params = { characterId, ...values }
    this.props.createAdminCharacterSkill(params)
    resetForm()
  }

  validate(values) {
    let errors = {}

    if (values.skills.length === 0) {
      errors.skills = 'You must select at least one skill.'
    }

    return errors
  }

  render() {
    if (this.props.isFetching) {
      return <LoadingSpinner />
    }

    if (!this.props.isFetching && !this.props.skills) {
      return <h1 className='text-center top-padded'>No matching skills found.</h1>
    }

    const { skills, meta } = this.props
    const { characterId, characterName, userId } = meta

    const breadcrumbs = [
      { to: '/admin/users', label: 'Users' },
      { to: `/admin/users/${userId}`, label: userId},
      { to: `/admin/characters/${characterId}`, label: `Character: ${characterName}` }
    ]

    const initialValues = {
      skills: []
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Reveal Skills' />
          <h1 className='text-center top-padded'>
            <i className='fa fa-eye-slash' />
            &nbsp;Reveal Skills for {characterName}
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            validate={this.validate}
            render={formikProps => (
              <HiddenSkillsForm
                skills={skills.map(skill => ({ label: skill.name, value: skill.skillId }))}
                {...formikProps}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default AdminCharacterNewSkillContainer
