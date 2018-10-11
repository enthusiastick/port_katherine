import React, { Component } from 'react'
import { Formik } from 'formik'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import { default as HeadersForm } from '../forms/Headers'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class AdminCharacterNewHeaderContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.meta.characterId !== this.props.characterId) {
      this.props.getAdminAvailableHeaders(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  onSubmit(values) {
    console.log(values)
  }

  render() {
    if (this.props.isFetching) {
      return <LoadingSpinner />
    }

    const { headers, meta } = this.props
    const { characterId, characterName, userId } = meta

    const breadcrumbs = [
      { to: '/admin/users', label: 'Users' },
      { to: `/admin/users/${userId}`, label: userId},
      { to: `/admin/characters/${characterId}`, label: characterName }
    ]

    const initialValues = {
      cost: '',
      headers: []
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Add Headers' />
          <h1 className='text-center top-padded'>
            <i className='fa fa-plus-circle' />
            &nbsp;Add Headers to {characterName}
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            render={formikProps => (
              <HeadersForm
                headers={headers.map(header => ({ label: header.name, value: header.id }))}
                {...formikProps}
              />
            )}
          />
        </div>
      </div>
    )
  }
}


export default AdminCharacterNewHeaderContainer
