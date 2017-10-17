const normalizeNoWhiteSpace = value => {
  if (!value) {
    return value
  }

  const noWhiteSpace = value.replace(/\s+/g,'')
  return noWhiteSpace
}

export default normalizeNoWhiteSpace
