import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

import { restrictToPlotStaff } from '../../constants/restrictAccess'

class UsersIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictToPlotStaff(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.adminUsers.length == 0) {
      this.props.getAdminUsers()
    }
  }

  render() {
    let tableRows = this.props.adminUsers.map(user => {
      let name = `${user.firstName} ${user.lastName}`

      return(
        <Tr key={user.id}>
          <Td column='handle' value={user.handle}>
            <Link to={`/admin/users/${user.handle}`}>{user.handle}</Link>
          </Td>
          <Td column='name' data={name} />
          <Td column='email' value={user.email}>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </Td>
        </Tr>
      )
    })

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>{`Users (${this.props.adminUsers.length})`}</h1>
          <Table
            className='hover'
            filterable={['handle', 'email', 'name']}
            itemsPerPage={25}
            sortable={true}
          >
            <Thead>
              <Th column='handle'>Handle</Th>
              <Th column='name'>Name</Th>
              <Th column='email'>Email</Th>
            </Thead>
            {tableRows}
          </Table>
        </div>
      </div>
    )
  }
}

export default UsersIndexContainer
