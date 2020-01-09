function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  const data = items.slice(startIndex, startIndex + pageSize)
  return data
}
export default paginate
