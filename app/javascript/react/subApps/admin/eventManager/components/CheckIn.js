import React from 'react'
import humps from 'humps'
import { Link } from 'react-router-dom'

import CheckInCharacterSelect from './formFields/CheckInCharacterSelect'

const CheckIn = ({
  handleSubmit,
  isSubmitting,
  playerCharacters,
  setFieldValue,
  user,
  userHandle,
  values
}) => {

  return(
    <form onSubmit={handleSubmit}>
      <div className='callout primary'>
        <div className='row'>
          <div className='small-3 columns'>
            <Link to={`/admin/users/${userHandle}`}>{user}</Link>
          </div>
          <div className='small-6 columns text-center'>
            <CheckInCharacterSelect
              onChange={setFieldValue}
              options={playerCharacters}
              value={values.characterId}
            />
          </div>
          <div className='small-3 columns text-right'>
            <button className='bottomless button' type='submit' disabled={isSubmitting}>
              Check In
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckIn
