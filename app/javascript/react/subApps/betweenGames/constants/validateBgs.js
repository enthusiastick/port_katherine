const validateBgs = values => {
  let errors = {}

  if (values.category === null) {
    errors.category = 'Please choose a type for your BGS'
  }

  if (values.title === '') {
    errors.title = 'Please title your BGS'
  }

  if (values.body === '') {
    errors.body = 'Please enter a description of your BGS'
  }

  return errors
}

export default validateBgs
