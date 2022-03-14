import React from 'react'
import { parse } from 'marked'

import TextArea from '../../../sharedResources/components/formik/TextArea'

const Feedback = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  const markdownParsedDescription = parse(values.feedback)
  const renderedHTML = { __html: markdownParsedDescription }

  return(
    <form onSubmit={handleSubmit}>
      <div className='form-inputs tall-text'>
        <div className='grid-container'>
          <div className='grid-x grid-margin-x small-up-1 medium-up-2'>
            <div className='cell'>
              <a
                className='float-center'
                href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'
                target='_blank'
              >
                <i className='fa fa-link' /> Guide to Markdown formatting.
              </a>
              <TextArea
                error={errors.feedback}
                touched={touched.feedback}
                handleBlur={handleBlur}
                handleChange={handleChange}
                name='feedback'
                value={values.feedback}
              />
            </div>
            <div className='cell'>
              <div className='card'>
                <div className='card-divider'>
                  <h4 className='float-center'>Preview</h4>
                </div>
                <div className='card-section' dangerouslySetInnerHTML={renderedHTML} />
              </div>
            </div>
          </div>
        </div>
        <div className='callout secondary'>
          <p>
            <strong>Please Note:</strong> Your PEL will be shared with all volunteer staff. If you have concerns that you wish to keep private, please <a href='mailto:staff@portkatherine.com'><i className='fa fa-envelope' /> email us</a>.
          </p>
        </div>
      </div>
      <div className='form-actions'>
        <button className='button' type='submit' disabled={isSubmitting}>
          Save
        </button>
      </div>
    </form>
  )
}

export default Feedback
