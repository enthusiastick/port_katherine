import React, { Component } from 'react'

class ShowCharacterContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      available, birthplace, cycleSpendingCap, headers, name, playerAvailable,
      spent, spentCycle
    } = this.props.character

    let headerElements = headers.map(header => {
      return(<div key={header} className='callout'>{header}</div>)
    })

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>{name}</h1>
          <p className='bottomless'>
            <strong>Place of Origin:</strong> {birthplace}
          </p>
          <p className='bottomless'>
            <strong>Player CP Available:</strong> {playerAvailable}
          </p>
          <p className='bottomless'>
            <strong>Character CP Available:</strong> {available}
          </p>
          <p className='bottomless'>
            <strong>CP Spent This Cycle:</strong> {spentCycle} / {cycleSpendingCap}
          </p>
          <p>
            <strong>Total CP Spent:</strong> {spent}
          </p>
          {headerElements}
        </div>
      </div>
    )
  }
}

export default ShowCharacterContainer
