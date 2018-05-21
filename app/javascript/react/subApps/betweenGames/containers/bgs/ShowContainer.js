import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

import BgsIcon from '../../../../sharedResources/components/BgsIcon'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.bgsId !== this.props.bgs.id) {
      this.props.getBgs(this.props.bgsId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    let markdownParsedBody, markdownParsedResponse, renderedBodyHTML,
      renderedResponseHTML, bgsDiv, responseDiv
    const { bgsId, isFetching } = this.props
    const { body, category, isDeadlinePast, responseBody, responseTitle, title } = this.props.bgs

    if (isFetching) { return <LoadingSpinner /> }

    if (body) {
      markdownParsedBody = marked(body)
      renderedBodyHTML = { __html: markdownParsedBody }
      bgsDiv = (
        <div dangerouslySetInnerHTML={renderedBodyHTML} />
      )
    }

    if (responseBody) {
      markdownParsedResponse = marked(responseBody)
      renderedResponseHTML = { __html: markdownParsedResponse }
      responseDiv = (
        <div className='card'>
          <div className='card-divider'>
            <h2 className='float-center'>{responseTitle}</h2>
          </div>
          <div className='card-section' dangerouslySetInnerHTML={renderedResponseHTML} />
        </div>
      )
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='top-padded'>
            <div className='callout primary'>
              {!isDeadlinePast && <div className='float-right'>
                <Link to={`/bgs/${bgsId}/edit`}>
                  <i className='fa fa-pencil-square fa-3x' /> Edit
                </Link>
              </div>}
              <h2 className='text-center'><BgsIcon category={category} /> {title}</h2>
              {bgsDiv}
            </div>
            {responseDiv}
          </div>
        </div>
      </div>
    )
  }
}

export default BgsShowContainer
