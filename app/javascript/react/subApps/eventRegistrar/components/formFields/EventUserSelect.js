import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { getEvents } from '../../actions/getEvents'

const mapStateToProps = (state, ownProps) => {
  const filteredEvent = state.events.items.filter(event =>
    { if (event.slug === ownProps.eventSlug)
      { return event }
    }
  )[0]

  let users = []
  if (filteredEvent) { users = filteredEvent.users }

  return {
    users: users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => { dispatch(getEvents()) }
  }
}

class EventUserSelect extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.users.length === 0) {
      this.props.getEvents()
    }
  }

  handleChange = value => {
    this.props.onChange(this.props.name, value)
  }

  handleBlur = () => {
    this.props.onBlur(this.props.name, true)
  }

  render() {
    const {
      error,
      onBlur,
      onChange,
      name,
      label,
      touched,
      users,
      value
    } = this.props

    const options = users.map(user => {
      return { label: user.name, value: user.handle }
    })

    return(
      <fieldset>
        <label
          className={ touched && error && 'is-invalid-label' }
          htmlFor={name}
        >
          {label}
          <Select
            id={name}
            options={options}
            multi={true}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={value}
          />
          { touched && error && <div style={{ marginTop: '.5rem' }}><span className='form-error is-visible'>{error}</span></div> }
        </label>
      </fieldset>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventUserSelect)
