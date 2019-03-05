import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { getAdminUsers } from '../../../subApps/admin/actions/getAdminUsers'

const mapStateToProps = state => {
  return {
    adminUsers: state.adminUsers.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAdminUsers: () => { dispatch(getAdminUsers()) }
  }
}

class UserSelect extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.adminUsers.length == 0) {
      this.props.getAdminUsers()
    }
  }

  handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const options = this.props.adminUsers.map(user => {
      return { label: user.name, receivedCycle: user.receivedCycle, value: user.handle }
    })

    return (
      <fieldset>
        <label
          className={ this.props.touched && this.props.errors && 'is-invalid-label' }
          htmlFor={this.props.name}
        >
          { this.props.multi ?
            'Users (select at least 1)' :
            'User (select 1)'
          }{' '}
          <Select
            id={this.props.name}
            options={options}
            multi={this.props.multi}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />
        </label>
        { this.props.touched && this.props.errors && <div style={{ marginTop: '.5rem' }}><span className='form-error is-visible'>{this.props.errors}</span></div> }
      </fieldset>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSelect)
