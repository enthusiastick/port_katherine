const validateAdminBgs = values => {
  let errors = {}

  const { body, character, event, title } = values

  if (character === null || !character.value) {
    errors.character = 'Please select a character for this BGS'
  }

  if (event === null || !event.value) {
    errors.event = 'Please select an upcoming event'
  }

  if (title === '' && character.value) {
    errors.title = 'Please title this BGS'
  }

  return errors
}

export default validateAdminBgs
