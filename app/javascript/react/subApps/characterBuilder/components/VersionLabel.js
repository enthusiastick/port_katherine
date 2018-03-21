import React from 'react'

const VersionLabel = props => {
  return <span className='bg-navy body-font label'>v{process.env.CHARACTER_BUILDER_VERSION}</span>
}

export default VersionLabel
