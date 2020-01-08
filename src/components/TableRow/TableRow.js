import React from "react"
import "./TableRow.scss"
import PropTypes from "prop-types"

function TableRow({ data }) {
  return (
    <tr className="TableRow">
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.city}</td>
      <td>{data.sum}</td>
      <td>{data.average}</td>
      <td>{data.last}</td>
    </tr>
  )
}

TableRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired,
    average: PropTypes.number.isRequired,
    last: PropTypes.number.isRequired
  })
}

TableRow.defaultProps = {
  data: {
    id: 1,
    name: "Warsaw Comapny",
    city: "Warsaw",
    sum: 342234.21,
    average: 342234.21,
    last: 342234.21
  }
}

export default TableRow
