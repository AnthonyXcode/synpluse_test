import moment from 'moment'

type ITimeFormat = 'YYYY-MM-DD hh:mm' | 'YYYY-MM-DD'

export const convertTimeString = (timeString: string, format: ITimeFormat) => {
  return moment(timeString).format(format)
}
