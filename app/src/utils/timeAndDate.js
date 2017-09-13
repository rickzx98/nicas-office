import { timeFromInt, timeToInt } from 'time-number';

import moment from 'moment';

export function addSeconds(date, time) {
  const hoursAndMin = timeFromInt(time, 24).split(':');
  const newDate = moment(date)
    .hour(hoursAndMin[0])
    .minute(hoursAndMin[1]).toJSON();
  return newDate;
}

export function dateToSeconds(date) {
  return timeToInt(moment(date).format('HH:mm:ss'));
}


export function toReadableDate(date) {
  if (!date) {
    return 'NA';
  }
  return moment(date).format('MMMM Do YYYY');
}
export function toReadableTime(date) {
  if (!date) {
    return 'NA';
  }
  return moment(date).format('h:mm:ss a');
}

export function toReadableDatestamp(date) {
  if (!date) {
    return 'NA';
  }
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}
