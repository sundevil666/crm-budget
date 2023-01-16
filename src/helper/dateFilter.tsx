const dateFilter = (val: Date, format: string = 'date'): Object => {
  const options: {
    day?: '2-digit'
    month?: 'long'
    year?: 'numeric'
    hour?: '2-digit'
    minute?: '2-digit'
    second?: '2-digit'
  } = {}

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }
  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  const date = new Date(
    Date.UTC(
      val.getFullYear(),
      val.getMonth(),
      val.getDay(),
      val.getHours(),
      val.getMinutes(),
      val.getSeconds(),
      val.getMilliseconds()
    )
  )

  return new Intl.DateTimeFormat('ru-RU', options).format(date)
}

export default dateFilter
