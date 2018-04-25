import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import CharactersTable from '../components/characters/CharactersTable'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.userId != this.props.user.id) {
      this.props.getAdminUser(this.props.userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    let selfReportElement

    const {
      available,
      characters,
      email,
      handle,
      lastSignIn,
      name,
      selfReport,
      signInCount,
      since
    } = this.props.user

    const breadcrumbs= [{ to: '/admin/users', label: 'Users' }]

    const showCharactersTable = (characters && characters.length > 0)

    if (selfReport) {
      selfReportElement = (
        <div className='callout'>
          <h5><i className='fa fa-medkit' /> Medical Self Report</h5>
          <div className='top-padded'>
            {selfReport}
          </div>
        </div>
      )
    }
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={handle} />
          <div className='card'>
            <div className='card-divider'>
              <h1 className='float-center'><i className='fa fa-user-circle-o' /> {name}</h1>
            </div>
            <div className='card-section'>
              <p><i className='fa fa-envelope' /> <a href={`to:${email}`}>{email}</a></p>
              <p>
                <strong>User For:</strong> {since}<br/>
                <strong>Last Sign In:</strong> {lastSignIn}<br/>
                <strong>Sign In Count:</strong> {signInCount}<br />
                <strong>Player CP Available:</strong> {available}
              </p>
              {showCharactersTable && <CharactersTable characters={characters} />}
              {selfReportElement}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserShowContainer
