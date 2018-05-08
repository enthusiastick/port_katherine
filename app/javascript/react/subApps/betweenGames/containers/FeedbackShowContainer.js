import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

class FeedbackShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.booking.id) {
      this.props.getBetweenGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    let markdownParsedDescription, renderedHTML, pel
    const { eventSlug } = this.props
    const { feedback, label } = this.props.booking

    if (feedback) {
      markdownParsedDescription = marked(feedback)
      renderedHTML = { __html: markdownParsedDescription }
      pel = (
        <div className='callout primary' dangerouslySetInnerHTML={renderedHTML} />
      )
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='text-center'>
            <h1 className='top-padded'>{label} PEL</h1>
            <Link className='button' to={`/pels/${eventSlug}/edit`}>
              <i className='fa fa-pencil-square' /> Edit
            </Link>
          </div>
          {pel}
        </div>
      </div>
    )
  }
}

export default FeedbackShowContainer
