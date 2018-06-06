import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import TalliesTable from '../../../../sharedResources/components/tallies/TalliesTable'

class AdminIndexTalliesContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getTallies(this.props.characterId)
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    const { tallies } = this.props
    const { items, meta } = tallies

    const breadcrumbs = [
      { to: '/admin/users', label: 'Users' },
      { to: `/admin/users/${meta.userHandle}`, label: meta.userHandle },
      { to: `/admin/characters/${this.props.characterId}`, label: `Character: ${meta.characterName}` }
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Build Logs' />
          <h1 className='top-padded'>Build Logs</h1>
          <TalliesTable itemsPerPage={25} tallies={items} />
        </div>
      </div>
    )
  }
}

export default AdminIndexTalliesContainer
