import React from "react"
import propTypes from "prop-types"

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props
  const pagesCount = Math.ceil(itemsCount / pageSize)
  if (pagesCount === 1) return null
  const pages = Array(pagesCount)
    .fill(0, 0, pagesCount)
    .map((elem, idx) => {
      return idx + 1
    })

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item "}
          >
            <button
              className="page-link"
              type="button"
              onClick={() => {
                onPageChange(page)
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
}

export default Pagination
