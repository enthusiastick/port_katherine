import React, { Component } from 'react'
import { Formik } from 'formik'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import { default as SkillForm } from '../forms/Skill'

class NewSkillContainer extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount() {
    if (this.props.headers.length === 0) {
      this.props.getAdminHeaders()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  onSubmit(values) {
    console.log(values)
  }

  validate(values) {
    console.log(values)
    return {}
  }

  render() {
    const { isFetching, headers } = this.props

    const breadcrumbs = [
      { to: '/admin/skills', label: 'Headers & Skills' }
    ]

    const initialValues = {
      name: '',
      startingCost: 1
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='New Skill' />
          <h1 className='text-center top-padded'>New Skill</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            validate={this.validate}
            render={formikProps => (
              <SkillForm
                headers={headers}
                {...formikProps}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default NewSkillContainer
