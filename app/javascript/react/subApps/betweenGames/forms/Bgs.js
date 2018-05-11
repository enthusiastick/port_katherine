import React, { Component } from 'react'
import { Field, FieldArray } from 'formik'
import marked from 'marked'

import BgsIcon from '../components/bgs/Icon'
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

    const categories = [
      { id: 'focus', name: 'Focus' },
      { id: 'lesson', name: 'Lesson' },
      { id: 'skill', name: 'Skill' }
    ]

    const closePreview = event => { this.setState({showPreview: false}) }
    const openPreview = event => { this.setState({showPreview: true}) }

    let titleAndBodySection = (
      <div>
        <TextInput
          error={errors.title}
          touched={touched.title}
          handleBlur={handleBlur}
          handleChange={handleChange}
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
            <h1>{values.title}</h1>
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
          <fieldset className='fieldset topless'>
            <legend>Select type:</legend>
            <FieldArray
              name='category'
              render={arrayHelpers => (
                <div className='row'>
                  {categories.map(category => (
                    <div className='small-12 medium-4 columns' key={category.id}>
                      <div className='text-center'>
                        <label>
                          <input
                            className='bottomless'
                            name='category'
                            type='radio'
                            value={category.id}
                            checked={values.category === category.id}
                            onChange={handleChange}
                          />
                          <BgsIcon category={category.id} /> {category.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
          </fieldset>
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
