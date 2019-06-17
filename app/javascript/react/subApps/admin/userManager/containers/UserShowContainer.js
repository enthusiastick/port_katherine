import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import CharactersTable from '../components/characters/CharactersTable'
import PelsTable from '../components/PelsTable'
import TalliesTable from '../../../../sharedResources/components/tallies/TalliesTable'

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
      pels,
      receivedCycle,
      selfReport,
      signInCount,
      since,
      tallies
    } = this.props.user

    const breadcrumbs= [{ to: '/admin/users', label: 'Users' }]

    const showCharactersTable = (characters && characters.length > 0)
    const showTalliesTable = (tallies && tallies.length > 0)

    if (selfReport) {
      selfReportElement = (
        <div>
          <h3><i className='fa fa-medkit' /> Medical Self Report</h3>
          <div className='callout'>
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
              <p className='bottomless'><strong>User For:</strong> {since}</p>
              <p className='bottomless'><strong>Last Sign In:</strong> {lastSignIn}</p>
              <p className='bottomless'><strong>Sign In Count:</strong> {signInCount}</p>
              <p className='bottomless'><strong>Player CP Available:</strong> {available}</p>
              <p className='bottomless'><strong>CP Gifts Received This Cycle:</strong> {receivedCycle}</p>
            </div>
          </div>
          {showCharactersTable &&
            <div>
              <h3>Characters</h3>
              <CharactersTable characters={characters} />
            </div>
          }
          {selfReportElement}
          {pels && pels.length > 0 &&
            <div>
              <h3>PELs</h3>
              <PelsTable handle={handle} pels={pels} />
            </div>
          }
          {showTalliesTable &&
            <div>
              <h3>Recent User Activity</h3>
              <TalliesTable tallies={tallies} />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default UserShowContainer
