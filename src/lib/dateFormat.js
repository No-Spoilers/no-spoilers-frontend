const month = [
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
  if (!isoDate) return null;

  const date = new Date(isoDate);

  return `${month[date.getMonth()]} ${date.getFullYear()}`;
}