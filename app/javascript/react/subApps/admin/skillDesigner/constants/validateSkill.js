const validateSkill = (values) => {
  let errors = {}

  const blank = {
    costIncreaseAmount: 'Cost Increases can\'t be blank',
    costIncreaseRank: 'Cost Increases Every can\'t be blank',
    maxRank: 'You must set Maximum Purchases',
    startingCost: 'You must select a Starting Cost'
  }

  for(const value of Object.keys(blank)) {
    if (isNaN(parseInt(values[value]))) {
      errors[value] = blank[value]
    }
  }

  if (!values.name) {
    errors.name = 'You must enter a Name.'
  }

  if (values.headers.length === 0) {
    errors.headers = 'You must select at least one header.'
  }

  return errors
}

export default validateSkill
