import React from 'react'

import NavButton from '../../../../sharedResources/components/NavButton'

const HeadersNav = ({headers, navigationHandler, selected}) => {
  if (!headers.profession) { return null }

  const headerButtons = headers.stock.map(stock =>
    <NavButton
      key={stock.id}
      handler={navigationHandler}
      id={stock.id.toString()}
      label={stock.name}
      selected={selected}
    />
  )

  const professionButtons = headers.profession.map(profession =>
    <NavButton
      key={profession.id}
      handler={navigationHandler}
      id={profession.id.toString()}
      label={profession.name}
      selected={selected}
    />
  )

  return(
    <div>
      <div className='button-group small'>
        {headerButtons}
      </div>
      <div className='button-group small'>
        {professionButtons}
      </div>
    </div>
  )
}

export default HeadersNav
