export function copy(...sources) {
  let result = {};
  for (let i = 0; i < sources.length; i++) {
    for (let key in sources[i]) {
      if (sources[i].hasOwnProperty(key)) result[key] = sources[i][key];
    }
  }
  return result;
}

export const deleteFromModel = (id, state) => {
  const byId = {};
  Object.keys(state.byId).forEach(key => id !== key ? byId[key] = state.byId[key] : null);
  return Object.assign(
    {},
    { byId },
    {ids: state.ids.filter(stateId => id != stateId)}
  );
}

export function getDates(year, month) {
  let dates = [];
  const baseDate = new Date(year, month, 0);
  let firstDay = new Date(year, month - 1, 1).getDay();
  let date = (baseDate).getDate();
  while (date--) {
    dates.push(date + 1);
  }
  if (firstDay === 0) {
    dates = [ ...dates, false, false, false, false, false, false, ];
  } else {
    while (firstDay != 1) {
      dates.push(false);
      firstDay--;
    }
  }
  return dates.reverse();
}

export const leftpad = (str, pad, length) => {
  let ns = String(str);
  while (ns.length < length) {
    ns = pad + ns;
  }
  return ns;
};
function setLength(part, limit) {
  part = ''+part;
  if (part.length === limit) return part;
  if (part.length < limit) return leftpad(part, '0', limit);
  while (part.length > limit) {
    part = part.slice(1);
  }
  return part;

}
/**
 * @param {Date} sourceDate
 * @param {String} format
 */
export const formatDate = (sourceDate, format) => {
  const parts = format.split('|');
  console.log(parts);
  const [date, time] = parts;
  let limits = [date.match(/(d+)/)[0].length, date.match(/(m+)/)[0].length, date.match(/(y+)/)[0].length];
  console.log(limits);
  const dateParts = [sourceDate.getDate(), sourceDate.getMonth()+1, sourceDate.getFullYear()];
  let timeParts;
  dateParts.forEach((part, i) => {
    dateParts[i] = setLength(part, limits[i]);
    console.log('part:', part);
  });
  if (time !== undefined) {
    timeParts = [sourceDate.getHours(), sourceDate.getMinutes(), sourceDate.getSeconds()];
    limits = [time.match(/(h+)/)[0].length, time.match(/(M+)/)[0].length, time.match(/(s+)/)[0].length];

    timeParts.forEach((part, i) => {
      timeParts[i] = setLength(part, limits[i]);
    });

  }

  let res = parts.join(' ')
    .replace(/(d+)/, dateParts[0]).replace(/(m+)/, dateParts[1]).replace(/(y+)/, dateParts[2]);
  if (time !== undefined)
    res.replace(/(h+)/, timeParts[0]).replace(/(M+)/, timeParts[1]).replace(/(s+)/, timeParts[2]);
  return res;

};

export const MODEL_EDIT = 'MODEL_EDIT';
export const MODEL_CREATE = 'MODEL_CREATE';
