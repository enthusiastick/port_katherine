import React from 'react'

const RecipientInfo = ({points, receivedCycle, value}) => {
  let calloutClass = 'bottomless callout small warning'

  if (points) {
    const receivedFloat = parseFloat(receivedCycle)
    if ((points + receivedFloat) > 5.0) {
      calloutClass = 'bottomless callout small alert'
    }
  }

  return(
    <div className={calloutClass}>
      <p className='small text-center'>
        {value} has received <strong>{receivedCycle}</strong> CP this cycle.
      </p>
    </div>
  )
}

export default RecipientInfo
