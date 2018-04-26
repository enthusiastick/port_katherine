import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCharacters } from '../../../characterBuilder/actions/getCharacters'
import { getEvents } from '../../actions/getEvents'
import { updateBookingCharacter } from '../../actions/updateBookingCharacter'
import { eventBySlug } from '../../selectors/events'

const mapStateToProps = (state, ownProps) => {
  return {
    characters: state.characters.index,
    event: eventBySlug(state, ownProps),
    eventSlug: ownProps.match.params.eventSlug,
    hasUpdatedCharacter: state.events.hasUpdatedCharacter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: () => { dispatch(getCharacters()) },
    getEvents: () => { dispatch(getEvents()) },
    updateBookingCharacter: values => { dispatch(updateBookingCharacter(values)) }
  }
}

class EventCharacterSelect extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.event.slug) {
      this.props.getEvents()
    }

    if (this.props.characters.length === 0) {
      this.props.getCharacters()
    }
  }

  render() {
    const {
      characters,
      event,
      eventSlug,
      hasUpdatedCharacter,
      updateBookingCharacter
    } = this.props

    if (!event.userBooking) {
      return null
    }

    let value = ''

    if (event.userBooking && event.userBooking.character) {
      value = event.userBooking.character
    }

    const optionElements = characters.map(option => {
      return(<option key={option.id} value={option.id}>{option.name}</option>)
    })

    const onChange = e => {
      if (e.currentTarget.value) {
        updateBookingCharacter({eventSlug: eventSlug, characterId: e.currentTarget.value})
      }
    }

    return(
      <div className='row'>
        <div className='small-9 medium-10 columns'>
          <fieldset>
            <label htmlFor='eventCharacter'>Attending as&hellip;
              <select className='bottomless' name='eventCharacter' onChange={onChange} value={value}>
                <option disabled>Select character</option>
                {optionElements}
              </select>
            </label>
          </fieldset>
        </div>
        <div className='small-3 medium-2 columns'>
          {hasUpdatedCharacter &&
          <i className='fa fa-check-circle fa-2x bottomless solarized-green top-double-padded' />}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCharacterSelect)
