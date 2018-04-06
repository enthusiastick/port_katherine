import React, { Component } from 'react'
import { Field } from 'redux-form'

import authenticateUser from '../constants/authenticateUser'
import BreadcrumbsNav from '../../../sharedResources/components/BreadcrumbsNav'
import TextArea from '../../../sharedResources/components/formFields/TextArea'

class EditBackstoryForm extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characterId != this.props.character.id) {
      this.props.editCharacter(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    authenticateUser(nextProps.isSignedIn, this.props.push, this.props.flashNotice)
  }

  render() {
    let { pristine, submitting } = this.props
    let breadcrumbs = [
      { to: '/characters', label: 'Characters' },
      { to: `/characters/${this.props.character.id}`, label: this.props.character.name },
      { to: `/characters/${this.props.character.id}/edit`, label: 'Edit' }
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Backstory' />
          <h1 className='text-center top-padded'>Edit {this.props.character.name} Backstory</h1>
          <form onSubmit={this.props.handleSubmit(this.props.updateBackstory)}>
            <div className='form-inputs'>
              <Field
                name='body'
                label='Backstory'
                component={TextArea}
              />
            </div>
            <div className='callout'>
              <p>
                Kithira, being a fictional, fantasy world, is different from
                the real-world (18th century or otherwise) in many ways. Some
                of the differences may impact common tropes used in character
                histories:
              </p>
              <ul>
                <li>
                  Quick and powerful healing is very common
                </li>
                <li>
                  &quot;Bleeding to death&quot; is very rare
                </li>
                <li>
                  Women do not usually die in childbirth
                </li>
                <li>
                  Birth control exists and is generally accessible
                </li>
                <li>
                  Rape does not exist
                </li>
                <li>
                  Kithira is not predominantly patriarchal &ndash; in fact, many parts of the empire are matrilineal and/or primarily run by women
                </li>
                <li>
                  The world is flat, and, if you look down at night, you can see the sun through the aether clouds
                </li>
                <li>
                  It is not uncommon to see multiple examples of cultures and religions in every neighborhood.
                </li>
                <li>
                  Kithirans expect to be paid for services. There is no sense of collective obligation.
                </li>
                <li>
                  The aether is a contaminating force &ndash; those who spend their lives &quot;at sea&quot; end up with a variety of ailments and deformities, frequently reminiscent of sea creatures (e.g. an arm transmuting to a tentacle) Additionally, for game balance and the enjoyment of others, we ask that you not create characters who are:
                  <ul>
                    <li>
                      Serial killers or &quot;slashers&quot; joining the settlement in order to find new victims
                    </li>
                    <li>
                      People with access to vast resources not reflected in your character sheet (e.g. the Markisa of Zlota, an airship captain with a gang of loyal sailors offscreen, the high priest of the Penitent Order)
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='form-actions'>
              <button className='button' disabled={pristine || submitting} type='submit'>Update</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditBackstoryForm
