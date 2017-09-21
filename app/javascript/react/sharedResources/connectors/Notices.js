import React from 'react'
import { connect } from 'react-redux'

import Notice from '../components/Notice'

const mapStateToProps = state => {
  return {
    notices: state.notices.item
  }
}

const NoticeList = props => {
  let notices

  notices = Object.keys(props.notices).map(name => {
    return(<Notice key={props.notices[name]} message={props.notices[name]} name={name} />)
  })

  return(
    <div>
      {notices}
    </div>
  )
}

const Notices = connect(
  mapStateToProps
)(NoticeList)

export default Notices
