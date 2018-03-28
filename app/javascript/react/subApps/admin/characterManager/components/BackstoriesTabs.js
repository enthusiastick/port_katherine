import React from 'react';

const BackstoriesTabs = props => {
  const backstoryItems = props.backstories.map((backstory, index) => {
    return(
      <div key={backstory.id} className='callout'>
        <h3 className='bottomless text-center'>Version #{props.backstories.length - index}</h3>
        <p className='text-center'>{backstory.createdAt}</p>
        <hr />
        <div>
          {backstory.body}
        </div>
      </div>
    )
  })

  return(
    <div>
      {backstoryItems}
    </div>
  )
}

export default BackstoriesTabs
