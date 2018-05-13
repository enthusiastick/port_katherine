import React from 'react'

const AssigneeSelector = ({
  assigneeHandle, hasUpdatedAssignee, onChange, users
}) => {
  let value = ''

  if (assigneeHandle) { value = assigneeHandle }

  const optionElements = users.map(user => {
    return <option key={user.handle} value={user.handle}>{user.label}</option>
  })

  return(
    <div className='row'>
      <div className='small-11 medium-8 large-5 columns'>
        <fieldset className='bottom-margin'>
          <label htmlFor='bgsAssignee'>Assigned to:
            <select className='bottomless' name='bgsAssignee' onChange={onChange} value={value}>
              <option>&lt; No One &gt;</option>
              {optionElements}
            </select>
          </label>
        </fieldset>
      </div>
      <div className='small-1 medium-4 large-7 columns'>
        {hasUpdatedAssignee &&
          <i className='fa fa-check-circle fa-2x bottomless solarized-green top-double-padded' />}
      </div>
    </div>
  )
}

export default AssigneeSelector
