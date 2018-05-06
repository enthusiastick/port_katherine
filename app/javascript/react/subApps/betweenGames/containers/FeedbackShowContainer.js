import React, { Component } from 'react'
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
          <h1 className='text-center top-padded'>{label} PEL</h1>
          {pel}
        </div>
      </div>
    )
  }
}

export default FeedbackShowContainer
