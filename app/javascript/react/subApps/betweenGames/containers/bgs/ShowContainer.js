import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

import BgsIcon from '../../../../sharedResources/components/BgsIcon'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsShowContainer extends Component {
  constructor(props) {
    super(props)
    this.handleLock = this.handleLock.bind(this)
  }

  handleLock() {
    if (!this.props.isLocking && confirm('Locking this BGS will submit it to staff, and you will no longer be able to edit it. Do you wish to proceed?')) {
      this.props.lockBgs(this.props.bgsId)
    }
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
      renderedResponseHTML, bgsDiv, responseDiv, lockClass
    const { bgsId, isFetching, isLocking } = this.props
    const { body, category, isDeadlinePast, isLocked, responseBody, responseTitle, title } = this.props.bgs

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

    lockClass = 'large warning button'

    if (isLocking) {
      lockClass += ' disabled'
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='top-padded'>
            <div className='callout primary'>
              {!isDeadlinePast && !isLocked &&
                <div className='float-right'>
                  <Link to={`/bgs/${bgsId}/edit`}>
                    <i className='fa fa-pencil-square fa-3x' /> Edit
                  </Link>
                </div>
              }
              <h2 className='text-center'><BgsIcon category={category} /> {title}</h2>
              {bgsDiv}
            </div>
            {!isDeadlinePast && !isLocked &&
              <div className='text-right'>
                <div className={lockClass} onClick={this.handleLock}>
                  <i className='fa fa-lock' />
                  &nbsp;Lock
                </div>
              </div>
            }
            {responseDiv}
          </div>
        </div>
      </div>
    )
  }
}

export default BgsShowContainer
