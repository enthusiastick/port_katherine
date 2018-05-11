import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

import BgsIcon from '../../components/bgs/Icon'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.bgs.id) {
      this.props.getBetweenGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    let markdownParsedDescription, renderedHTML, bgsDiv
    const { bgsId, isFetching } = this.props
    const { body, category, isDeadlinePast, title } = this.props.bgs

    if (isFetching) { return <LoadingSpinner /> }

    if (body) {
      markdownParsedDescription = marked(body)
      renderedHTML = { __html: markdownParsedDescription }
      bgsDiv = (
        <div dangerouslySetInnerHTML={renderedHTML} />
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
              <h1 className='text-center'><BgsIcon category={category} /> {title}</h1>
              {bgsDiv}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BgsShowContainer
