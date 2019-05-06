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

  let objectToFilter = JSON.parse(JSON.stringify(inputObject));

  if (filterFieldNames.length > 1) {
    
    if(Array.isArray(objectToFilter)) {
      //Looping over array items
      objectToFilter = objectToFilter.map((item) => {
        return objectFilter(item, filter)
      })
    } else {
      //Recursion
      const nextObject = objectToFilter[filterFieldNames[0]]
      const newFilter = `${filterFieldNames.slice(1).join('.')}=${filterParsed[1]}`
      objectToFilter[filterFieldNames[0]] = objectFilter(nextObject, newFilter)
    }
    return objectToFilter
  } else {
    //Stopping point for reccursion
    let filterFieldName = filterFieldNames[filterFieldNames.length-1]
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
    return filteredResult
  }
}

module.exports = {
  objectFilter
}