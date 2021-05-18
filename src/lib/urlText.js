function urlText(text, seriesName) {
  const seriesWithParens = seriesName ? ` (${seriesName})` : '';
  return `${text}${seriesWithParens}`.replaceAll(' ', '_');
}

export default urlText;