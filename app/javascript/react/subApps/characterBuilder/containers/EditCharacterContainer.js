import React, { Component } from 'react'
import { Prompt } from 'react-router'
import { Link } from 'react-router-dom'

import authenticateUser from '../../../sharedResources/constants/authenticateUser'
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

  componentWillReceiveProps(nextProps) {
    authenticateUser(nextProps.isSignedIn, this.props.push, this.props.flashNotice)
  }

  saveHandler() {
    if (this.props.saveEligible.disabled) {
      alert(this.props.saveEligible.message)
    } else {
      const isAdmin = (this.props.location.pathname.split('/')[1] === 'admin')
      this.props.updateCharacter(this.props.delta, isAdmin)
    }
  }


  render() {
    const unsavedChanges = () => {
      return (
        this.props.delta.characterSkills.length != 0 ||
        this.props.delta.newHeaders.length != 0 ||
        this.props.delta.newSkills != 0
      )
    }

    const isAdmin = (this.props.location.pathname.split('/')[1] === 'admin')

    let backStoryButtonText = 'Enter Backstory'
    if (this.props.character.backstory != null) { backStoryButtonText = 'Edit Backstory' }

    let breadcrumbs = [
      { to: '/characters', label: 'Characters' },
      { to: `/characters/${this.props.character.id}`, label: this.props.character.name }
    ]

    if (isAdmin) {
      breadcrumbs = [
        { to: '/admin/users', label: 'Users' },
        { to: `/admin/users/${this.props.character.userHandle}`, label: this.props.character.userHandle },
        { to: `/admin/characters/${this.props.character.id}`, label: `Character: ${this.props.character.name}` }
      ]
    }

    let openSkills, headerButtons, headerTiles, professionButtons, professionTiles

    if (this.props.character.open) {
      openSkills =
        <SkillList
          changeCharacterSkill={this.props.changeCharacterSkill}
          changeSkill={this.props.changeSkill}
          deltaCharacterSkills={this.props.delta.characterSkills}
          deltaNewSkills={this.props.delta.newSkills}
          removeCharacterSkill={this.props.removeCharacterSkill}
          removeSkill={this.props.removeSkill}
          saveEligible={this.props.saveEligible}
          skills={this.props.character.open}
        />
    }

    if (this.props.selectedHeaders) {
      headerTiles = this.props.selectedHeaders.map(header => {
        if (header.category != 'profession') {
          return(
            <HeaderTile
              key={header.headerId}
              changeCharacterSkill={this.props.changeCharacterSkill}
              changeSkill={this.props.changeSkill}
              delta={this.props.delta}
              removeCharacterSkill={this.props.removeCharacterSkill}
              removeHeader={this.props.removeHeader}
              removeSkill={this.props.removeSkill}
              saveEligible={this.props.saveEligible}
              {...header}
            />
          )
        }
      })
      headerButtons = this.props.character.headers.map(header => {
        if (header.category != 'profession') {
          return(
            <HeaderButton
              key={header.headerId}
              addHeader={this.props.addHeader}
              availableHeaders={this.props.availableHeaders}
              delta={this.props.delta}
              removeHeader={this.props.removeHeader}
              saveEligible={this.props.saveEligible}
              {...header}
            />
          )
        }
      })
      professionTiles = this.props.selectedHeaders.map(header => {
        if (header.category === 'profession') {
          return(
            <HeaderTile
              key={header.headerId}
              changeCharacterSkill={this.props.changeCharacterSkill}
              changeSkill={this.props.changeSkill}
              delta={this.props.delta}
              removeCharacterSkill={this.props.removeCharacterSkill}
              removeHeader={this.props.removeHeader}
              removeSkill={this.props.removeSkill}
              saveEligible={this.props.saveEligible}
              {...header}
            />
          )
        }
      })
      professionButtons = this.props.character.headers.map(header => {
        if (header.category === 'profession') {
          return(
            <HeaderButton
              key={header.headerId}
              addHeader={this.props.addHeader}
              availableHeaders={this.props.availableHeaders}
              delta={this.props.delta}
              removeHeader={this.props.removeHeader}
              saveEligible={this.props.saveEligible}
              {...header}
            />
          )
        }
      })
    }

    return(
      <div>
        <Prompt
          message="You have unsaved changes. Are you sure you wish to continue?"
          when={unsavedChanges()}
        />
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
                <div className='button-group stacked'>
                  <a className='button' disabled={this.props.saveEligible.disabled} onClick={this.saveHandler} >
                    <i className='fa fa-save' /> Save Character
                  </a>
                  {!isAdmin && <Link className='button' to={`/characters/${this.props.character.id}/backstory`}>
                      <i className='fa fa-pencil-square-o' /> {backStoryButtonText}
                    </Link>}
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
          <h2>Headers</h2>
          <div className='grid-x grid-margin-x small-up-1 medium-up-2'>
            <div className='cell card'>
              <div className='card-section'>
                <div className='button-group stacked'>
                  {headerButtons}
                </div>
              </div>
            </div>
            {headerTiles}
          </div>
          <h2>Professions</h2>
          <div className='grid-x grid-margin-x small-up-1 medium-up-2'>
            <div className='cell card'>
              <div className='card-section'>
                <div className='button-group stacked'>
                  {professionButtons}
                </div>
              </div>
            </div>
            {professionTiles}
          </div>
        </div>
      </div>
    )
  }
}

export default EditCharacterContainer
