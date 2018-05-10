import React, { Component } from 'react'
import { Field, FieldArray } from 'formik'
import marked from 'marked'

import TextArea from '../../../sharedResources/components/formik/TextArea'


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

    if (this.state.showPreview) {
      const markdownParsedDescription = marked(values.body)
      const renderedHTML = { __html: markdownParsedDescription }

      const closePreview = event => { this.setState({showPreview: false}) }

      return(
        <form onSubmit={handleSubmit}>
          <div className='form-preview'>
            <div className='callout primary'>
              <h1>{values.title}</h1>
              <div dangerouslySetInnerHTML={renderedHTML} />
              <div className='close-button' onClick={closePreview}>
                <span aria-hidden='true'>&times;</span>
              </div>
            </div>
          </div>
          <div className='form-actions'>
            <div className='button' onClick={closePreview}>
              Cancel
            </div>
            &nbsp;
            <button className='button' type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      )
    }

    const bookingOptions = bookings.map(booking => {
      const { id, label } = booking

      return(
        <option key={id} value={id}>{label}</option>
      )
    })

    const openPreview = event => { this.setState({showPreview: true}) }

    return(
      <form onSubmit={handleSubmit}>
        <div className='form-inputs tall-text'>
          <fieldset className='bottomless'>
            <label
                className={ touched && errors.booking && 'is-invalid-label' }
                htmlFor='booking'
              > Event
              <Field component='select' name='booking'>
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
                      <label className='text-center'>
                        <input
                          className='bottomless'
                          name='category'
                          type='radio'
                          value={category.id}
                          checked={values.category === category.id}
                          onChange={handleChange}
                        />
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='title'>Subject</label>
            <input
              id='title'
              name='title'
              type='text'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
          </fieldset>
          <TextArea
            error={errors.body}
            touched={touched.body}
            handleBlur={handleBlur}
            handleChange={handleChange}
            name='body'
            value={values.body}
          />
        </div>
        <div className='form-actions'>
          <div className='button' onClick={openPreview}>
            Preview
          </div>
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
