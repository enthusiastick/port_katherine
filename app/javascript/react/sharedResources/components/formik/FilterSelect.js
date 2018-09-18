import React, { Component } from 'react'
import Select from 'react-select'

class FilterSelect extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = value => {
    this.props.setFieldValue(this.props.name, value)
  }

  handleBlur = () => {
    this.props.onBlur(this.props.name, true)
  }

  render() {
    return(
      <fieldset className='bottom-margin'>
        <label
          className={ this.props.touched && this.props.error && 'is-invalid-label' }
          htmlFor={this.props.name}
        >
          { this.props.multi ?
            `${this.props.label} (select at least 1)` :
            `${this.props.label} (select 1)`
          }{' '}
          <Select
            id={this.props.name}
            options={this.props.options}
            multi={this.props.multi}
            onChange={(this.props.onChange) ? this.props.onChange : this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />
        </label>
        { this.props.touched && this.props.error && <div style={{ marginTop: '.5rem' }}><span className='form-error is-visible'>{this.props.error}</span></div> }
      </fieldset>
    )
  }
}

export default FilterSelect
