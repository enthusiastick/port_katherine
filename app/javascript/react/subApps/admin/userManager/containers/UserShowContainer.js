import React, { Component } from 'react'

import { restrictToPlotStaff } from '../../constants/restrictAccess'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import CharactersTable from '../components/characters/CharactersTable'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictToPlotStaff(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.userId != this.props.user.id) {
      this.props.getAdminUser(this.props.userId)
    }
  }

  render() {
    let {
      available,
      characters,
      email,
      handle,
      lastSignIn,
      name,
      signInCount,
      since
    } = this.props.user

    let breadcrumbs= [{ to: '/admin/users', label: 'Users' }]

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
              <CharactersTable characters={characters} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserShowContainer
