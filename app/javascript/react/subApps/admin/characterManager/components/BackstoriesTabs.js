import React from 'react';

const BackstoriesTabs = props => {
  const backstoryItems = props.backstories.map((backstory, index) => {
    return(
      <div key={backstory.id} className='callout'>
        <p className='bottomless float-left'>
          <strong>Version #{props.backstories.length - index}</strong>
        </p>
        <p className='bottomless float-right'>
          <em>{backstory.createdAt}</em>
        </p>
        <hr />
        <div className='pre-line'>
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
