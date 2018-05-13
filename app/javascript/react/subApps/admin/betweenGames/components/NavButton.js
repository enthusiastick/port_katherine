import React from 'react'

const NavButton = ({handler, id, label, selected}) => {
  let className = 'button'

  if (id === selected) { className += ' table-nav' }

  return(
    <div id={id} className={className} onClick={handler}>
      {label}
    </div>
  )
}

export default NavButton
