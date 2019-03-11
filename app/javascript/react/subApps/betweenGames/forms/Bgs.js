import React, { Component } from 'react'
import { Field } from 'formik'
import marked from 'marked'

import CategoryRadioButtons from './CategoryRadioButtons'
import BgsIcon from '../../../sharedResources/components/BgsIcon'
import TextArea from '../../../sharedResources/components/formik/TextArea'
import TextInput from '../../../sharedResources/components/formik/TextInput'

class Bgs extends Component {
  constructor(props) {
    super(props)
    this.state = { showPreview: false }
  }

  render() {
    const {
      bookings,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    } = this.props

    const closePreview = event => { this.setState({showPreview: false}) }
    const openPreview = event => { this.setState({showPreview: true}) }

    let titleAndBodySection = (
      <div>
        <TextInput
          error={errors.title}
          touched={touched.title}
          handleBlur={handleBlur}
          handleChange={handleChange}
          label='Title'
          name='title'
          value={values.title}
        />
        <TextArea
          error={errors.body}
          touched={touched.body}
          handleBlur={handleBlur}
          handleChange={handleChange}
          name='body'
          value={values.body}
        />
      </div>
    )

    const bookingOptions = bookings.map(booking => {
      const { id, label } = booking

      return(
        <option key={id} value={id}>{label}</option>
      )
    })

    if (this.state.showPreview) {
      const markdownParsedDescription = marked(values.body)
      const renderedHTML = { __html: markdownParsedDescription }

      titleAndBodySection = (
        <div className='form-preview'>
          <div className='callout primary'>
            <h2 className='text-center'><BgsIcon category={values.category} /> {values.title}</h2>
            <div dangerouslySetInnerHTML={renderedHTML} />
            <div className='close-button' onClick={closePreview}>
              <span aria-hidden='true'>&times;</span>
            </div>
          </div>
        </div>
      )
    }

    return(
      <form onSubmit={handleSubmit}>
        <div className='form-inputs tall-text'>
          <fieldset className='bottomless'>
            <label
                className={ touched && errors.bookingId && 'is-invalid-label' }
                htmlFor='bookingId'
              > Event
              <Field component='select' name='bookingId'>
                {bookingOptions}
              </Field>
            </label>
          </fieldset>
          <CategoryRadioButtons
            handleChange={handleChange}
            value={values.category}
          />
          {titleAndBodySection}
        </div>
        <div className='form-actions'>
          {!this.state.showPreview && <div className='button' onClick={openPreview}>
            Preview
          </div>}
          {this.state.showPreview && <div className='button' onClick={closePreview}>
            Cancel
          </div>}
          &nbsp;
          <button className='button' type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

export default Bgs
