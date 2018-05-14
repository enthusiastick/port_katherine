const validateComment = values => {
  let errors = {}

  if (!values.body) {
    errors.body = 'Comment body cannot be blank.'
  }

  return errors
}

export default validateComment
