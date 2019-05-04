const objectFilter = (inputObject, filter) => {
  //Can improve to catch more negative test cases
  if (!inputObject) {
    throw new Error('Missing input object')
  }
  if (!filter) {
    throw new Error('Missing filter')
  }
  const filterParsed = filter.split('=')
  const filterFieldNames = filterParsed[0].split('.')
  let filterValues = filterParsed[1].split(',')

  //Traversing to field
  let objectToFilter = inputObject
  let filterFieldName = filterFieldNames[filterFieldNames.length-1]
  filterFieldNames.forEach((fieldName, index) => {
    if(index !== filterFieldNames.length - 1 && filterFieldNames.length > 1) {
      objectToFilter = objectToFilter[fieldName]
    }
  })

  //Filtering values
  const filteredResult = objectToFilter.filter((item) => {
    let shouldKeepItem = false
    const currentFieldValue = item[filterFieldName]
    const indexOfItem = filterValues.indexOf(currentFieldValue)
    if (indexOfItem > -1) {
      shouldKeepItem = true
    }
    return shouldKeepItem
  })

  //Setting result
  let result = {...inputObject}
  if(filterFieldNames.length === 1) {
    result = filteredResult
  } else {
    filterFieldNames.forEach((fieldName, index) => {
      if(index === filterFieldNames.length - 2) {
        result[fieldName] = filteredResult
      }
    })
  }
  
  return result
}

module.exports = {
  objectFilter
}