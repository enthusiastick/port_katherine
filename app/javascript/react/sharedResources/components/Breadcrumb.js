import React from 'react'

import { Link } from 'react-router-dom'

const Breadcrumb = ({ breadcrumb }) => {
  return(
    <li><Link to={breadcrumb.to}>{breadcrumb.label}</Link></li>
  )
}

export default Breadcrumb
