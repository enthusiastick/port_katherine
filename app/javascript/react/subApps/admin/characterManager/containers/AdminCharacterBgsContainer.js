import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import BgsEvents from '../components/BgsEvents'

class AdminCharacterBgsContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characterId != this.props.bgs.id) {
      this.props.getAdminBgs(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    let breadcrumbs = [
      { to: '/admin/characters', label: 'Characters'},
      { to: `/admin/characters/${this.props.bgs.id}`, label: this.props.bgs.name  }
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='BGS' />
          <h1>BGS for {this.props.bgs.name}</h1>
          <BgsEvents characterBgs={this.props.bgs.characterBgs} />
        </div>
      </div>
    )
  }
}

export default AdminCharacterBgsContainer
