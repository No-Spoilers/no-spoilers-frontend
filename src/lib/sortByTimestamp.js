const sortByTimestamp = (sortOrder, field='pubDate') => {
  // sortOrder: 1 for high to low, or -1 for low to high
  return (a,b) => {
    const el1 = new Date(a[field])
    const el2 = new Date(b[field]);

    return sortOrder * (el2 - el1);
  }
}

export default sortByTimestamp;