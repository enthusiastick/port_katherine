import React, { Component } from 'react'
import { Field } from 'redux-form'

import authenticateUser from '../constants/authenticateUser'
import birthplaces from '../constants/birthplaces'
import BreadcrumbsNav from '../../../sharedResources/components/BreadcrumbsNav'
import VersionLabel from '../components/VersionLabel'

import Select from '../../../sharedResources/components/formFields/Select'
import TextInput from '../../../sharedResources/components/formFields/TextInput'

class NewCharacterContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (Object.keys(this.props.headers).length === 0) {
      this.props.getHeaders()
    }
  }

  componentWillReceiveProps(nextProps) {
    authenticateUser(nextProps.isSignedIn, this.props.push, this.props.flashNotice)
  }

  render() {
    let { pristine, submitting } = this.props
    let breadcrumbs = [{ to: '/characters', label: 'Characters' }]
    let professions = []
    let stockHeaders = []

    if (this.props.headers.profession) {
      professions = this.props.headers.profession.map(profession => {
        return( { value: profession.id, label: profession.name } )
      })
    }

    if (this.props.headers.stock) {
      stockHeaders = this.props.headers.stock.map(header => {
        return( { value: header.id, label: header.name } )
      })
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='New Character' />
          <h1 className='text-center top-padded'>New Character <VersionLabel /></h1>
          <div className='row'>
            <div className='medium-7 small-centered columns'>
              <form onSubmit={this.props.handleSubmit(this.props.createCharacter)}>
                <div className='form-inputs'>
                  <Field name='name' label='Name' component={TextInput} />
                  <Select
                    options={birthplaces}
                    name='birthplace'
                    label='Place of origin'
                    form='newCharacter'
                  />
                  <Select
                    options={professions}
                    name='firstProfessionId'
                    label='Profession'
                    form='newCharacter'
                  />
                  <Select
                    options={stockHeaders}
                    name='firstTrueHeaderId'
                    label='Header'
                    form='newCharacter'
                  />
                </div>
                <div className='form-actions'>
                  <button className='button' disabled={pristine || submitting} type='submit'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewCharacterContainer
