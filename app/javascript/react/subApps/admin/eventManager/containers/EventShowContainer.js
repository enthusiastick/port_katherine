import React, { Component } from 'react'
import { Table, Td, Th, Thead, Tr } from 'reactable'

import restrictAccess from '../../constants/restrictAccess'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'

class EventShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictAccess(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.eventSlug && !this.props.event) {
      this.props.getAdminEvents()
    }
  }

  render() {
    let breadcrumbs = [{ to: '/admin/events', label: 'Events' }]
    let label, tableRows

    if (this.props.eventSlug && this.props.event) {
      label = `${this.props.event.name} Registrations (${this.props.event.bookings.length})`
      tableRows = this.props.event.bookings.map(booking => {
        return(
          <Tr key={booking.id}>
            <Td column='user' data={booking.user} />
            <Td column='pass' data={booking.pass} />
            <Td column='paid' data={booking.paid.toString()} />
            <Td column='receipt' data={booking.receipt} />
          </Tr>
        )
      })
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={label} />
          <h1 className='text-center top-padded'>{label}</h1>
          <Table
            className='hover'
            filterable={['user', 'pass', 'paid', 'receipt']}
            itemsPerPage={25}
            sortable={true}
          >
            <Thead>
              <Th column='user'>User</Th>
              <Th column='pass'>Pass</Th>
              <Th column='paid'>Paid?</Th>
              <Th column='receipt'>Receipt</Th>
            </Thead>
            {tableRows}
          </Table>
        </div>
      </div>
    )
  }
}

export default EventShowContainer
