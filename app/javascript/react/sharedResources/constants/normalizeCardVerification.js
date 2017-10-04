const normalizeCardVerification = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  return onlyNums.slice(0, 4)
}

export default normalizeCardVerification
