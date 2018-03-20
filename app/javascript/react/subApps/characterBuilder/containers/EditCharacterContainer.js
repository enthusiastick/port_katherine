import React, { Component } from 'react'

import BreadcrumbsNav from '../../../sharedResources/components/BreadcrumbsNav'
import { default as HeaderButton } from '../components//header/Button.js'
import { default as HeaderTile } from '../components/header/Tile'
import { default as SkillList } from '../components/skill/List'

class EditCharacterContainer extends Component {
  constructor(props) {
    super(props)
    this.saveHandler = this.saveHandler.bind(this)
  }

  componentWillMount() {
    if (this.props.characterId != this.props.character.id) {
      this.props.editCharacter(this.props.characterId)
    }
  }

  saveHandler() {
    if (this.props.saveEligibile.disabled) {
      alert(this.props.saveEligibile.message)
    } else {
      this.props.updateCharacter(this.props.delta)
    }
  }

  render() {
    let breadcrumbs = [
      { to: '/characters', label: 'Characters' },
      { to: `/characters/${this.props.character.id}`, label: this.props.character.name }
    ]

    let openSkills, headerButtons, headerTiles

    if (this.props.character.open) {
      openSkills =
        <SkillList
          changeCharacterSkill={this.props.changeCharacterSkill}
          changeSkill={this.props.changeSkill}
          deltaCharacterSkills={this.props.delta.characterSkills}
          deltaNewSkills={this.props.delta.newSkills}
          removeCharacterSkill={this.props.removeCharacterSkill}
          removeSkill={this.props.removeSkill}
          skills={this.props.character.open}
        />
    }

    if (this.props.selectedHeaders) {
      headerTiles = this.props.selectedHeaders.map(header => {
        return(
          <HeaderTile
            key={header.headerId}
            changeCharacterSkill={this.props.changeCharacterSkill}
            changeSkill={this.props.changeSkill}
            delta={this.props.delta}
            removeCharacterSkill={this.props.removeCharacterSkill}
            removeHeader={this.props.removeHeader}
            removeSkill={this.props.removeSkill}
            {...header}
          />
        )
      })
      headerButtons = this.props.character.headers.map(header => {
        return(
          <HeaderButton
            key={header.headerId}
            addHeader={this.props.addHeader}
            availableHeaders={this.props.availableHeaders}
            delta={this.props.delta}
            removeHeader={this.props.removeHeader}
            {...header}
          />
        )
      })
    }

    return(
      <div>
        <div className='row'>
          <div className='small-12 columns'>
            <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Edit' />
            <h1 className='text-center top-padded'>Edit {this.props.character.name}</h1>
            <div className='row'>
              <div className='small-12 medium-9 columns'>
                <p className='bottomless'>
                  <strong>Player CP Available:</strong> {this.props.delta.points.playerAvailable}
                </p>
                <p className='bottomless'>
                  <strong>Character CP Available:</strong> {this.props.delta.points.available}
                </p>
                <p className='bottomless'>
                  <strong>CP Spent This Cycle:</strong> {this.props.delta.points.spentCycle} / {this.props.delta.points.cycleSpendingCap}
                </p>
                <p>
                  <strong>Total CP Spent:</strong> {this.props.delta.points.spent}
                </p>
              </div>
              <div className='small-12 medium-3 columns'>
                <p className='bottomless text-center'>
                  <strong>&Delta;CP of Selected Changes:</strong> {this.props.costOfDelta}
                </p>
                <div className='button-group expanded'>
                  <a className='button' disabled={this.props.saveEligibile.disabled} onClick={this.saveHandler} >
                    <i className='fa fa-save' /> Save
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid-container'>
          <div className='grid-x grid-margin-x small-up-1 medium-up-2'>
            <div className='cell card'>
              <div className='card-divider'>
                <h4 className='float-center'>Open</h4>
              </div>
              {openSkills}
            </div>
          </div>
          <div className='grid-x grid-margin-x small-up-1 medium-up-2 large-up-3'>
            <div className='cell card'>
              <div className='card-section'>
                <div className='button-group stacked'>
                  {headerButtons}
                </div>
              </div>
            </div>
            {headerTiles}
          </div>
        </div>
      </div>
    )
  }
}

export default EditCharacterContainer