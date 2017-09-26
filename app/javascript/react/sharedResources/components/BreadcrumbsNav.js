import React from 'react'

import Breadcrumb from './Breadcrumb'

const BreadcrumbsNav = props => {
  let breadcrumbs = props.breadcrumbs.map(breadcrumb => { return(<Breadcrumb key={breadcrumb.to} breadcrumb={breadcrumb} />) })

  return(
    <div className='callout'>
      <nav aria-label='You are here:' role='navigation'>
        <ul className='breadcrumbs bottomless'>
          {breadcrumbs}
          <li>
            <span className='show-for-sr'>Current: </span>{props.current}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default BreadcrumbsNav
