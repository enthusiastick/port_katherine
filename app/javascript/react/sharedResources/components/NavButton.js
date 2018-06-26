import React from 'react'

const NavButton = ({handler, id, label, selected}) => {
  let className = 'button'

  if (id === selected) { className += ' navy' }

  return(
    <div id={id} className={className} onClick={handler}>
      {label}
    </div>
  )
}

export default NavButton
