const month = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export default function dateFormat(isoDate) {
  if (!isoDate || typeof isoDate !== 'string') return null;

  try {
    const splitResult = isoDate.split('-');
  
    return `${month[parseInt(splitResult[1])]} ${splitResult[0]}`;
  } catch(e) {
    console.error(e);
    return null;
  }
}