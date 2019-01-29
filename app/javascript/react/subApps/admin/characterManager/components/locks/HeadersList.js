import React from 'react'

const HeaderItem = ({name}) => (
  <div className='callout'>
    <p><strong>{name}</strong></p>
  </div>
)

const HeadersList = ({headers}) => {
  console.log(headers)
  const list = headers.filter(header => header.characterHeaderId).map(header => (
    <HeaderItem key={header.headerId} {...header} />
  ))
  return(
    <ul>
      {list}
    </ul>
  )
}

export default HeadersList
