/* eslint-disable default-case */
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatTime(number) {
  return number < 10 ? `0${number}` : number;
}

export function displayDate(data) {
  const dateComment = new Date(data);
  const dateNow = new Date();

  const yearDif = dateNow.getFullYear() - dateComment.getFullYear();
  const dayDif = dateNow.getDate() - dateComment.getDate();
  const hourDif = dateNow.getHours() - dateComment.getHours();
  const minutesDif = dateNow.getMinutes() - dateComment.getMinutes();

  const year = dateComment.getFullYear();
  const month = formatTime(dateComment.getMonth());
  const day = formatTime(dateComment.getDate());
  const hour = formatTime(dateComment.getHours());
  const minutes = formatTime(dateComment.getMinutes());

  //console.log(
  //  { data: data },
  //  { dateComment: dateComment },
  //  { dateNow: dateNow },
  //  { yearDif: yearDif },
  //  { dayDif: dayDif },
  //  { hourDif: hourDif },
  //  { minutesDif: minutesDif },
  //);

  if (yearDif === 0) {
    if (dayDif === 0) {
      if (hourDif === 0) {
        if (minutesDif >= 0 && minutesDif < 5) return '1 minutes ago';
        if (minutesDif >= 5 && minutesDif < 10) return '5 minutes ago';
        if (minutesDif >= 10 && minutesDif < 30) return '10 minutes ago';
        return '30 minutes ago';
      }
      return `${hour}:${minutes}`;
    }
    return `${day}-${months[+month]}`;
  }
  return `${day}-${month}-${year}`;

  //switch (true) {
  //  case yearDif === 0 && dayDif === 0 && hourDif === 0 && minutesDif >= 0 && minutesDif < 5:
  //    return '1 minutes ago';
  //  case yearDif === 0 && dayDif === 0 && hourDif === 0 && minutesDif >= 5 && minutesDif < 10:
  //    return '5 minutes ago';
  //  case yearDif === 0 && dayDif === 0 && hourDif === 0 && minutesDif >= 10 && minutesDif < 30:
  //    return '10 minutes ago';
  //  case yearDif === 0 && dayDif === 0 && hourDif === 0:
  //    return '30 minutes ago';
  //  case yearDif === 0 && dayDif === 0:
  //    return `${hour}:${minutes}`;
  //  case yearDif === 0:
  //    return `${day}-${months[+month]}`;

  //  default:
  //    return `${day}-${month}-${year}`;
  //}
}
