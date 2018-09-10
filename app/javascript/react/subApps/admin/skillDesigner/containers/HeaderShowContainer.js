import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import HeaderBox from '../components/HeaderBox'

class HeaderShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.header.id !== this.props.headerId) {
      this.props.showAdminHeader(this.props.headerId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    const { isFetching, header } = this.props
    const { name } = header

    const breadcrumbs = [
      { to: '/admin/skills', label: 'Headers & Skills' }
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={`Header: ${name}`} />
          <HeaderBox isFetching={isFetching} {...header} />
        </div>
      </div>
    )
  }
}

export default HeaderShowContainer
