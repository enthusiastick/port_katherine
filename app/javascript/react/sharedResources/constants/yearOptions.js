let firstYear = (new Date().getFullYear())

let yearOptions = []

const range = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

range.forEach(addition => {
  let year = firstYear + addition
  yearOptions.push({ value: year, label: year })
})

export default yearOptions
