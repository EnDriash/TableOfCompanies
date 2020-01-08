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
      <td>{data.avarage}</td>
      <td>{data.last}</td>
    </tr>
  )
}

TableRow.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      city: PropTypes.string,
      sum: PropTypes.number,
      avarege: PropTypes.number,
      last: PropTypes.number
    })
  )
}

TableRow.defaultProps = {
  data: {
    id: "1",
    name: "Warsaw Comapny",
    city: "Warsaw",
    sum: 342234.21,
    avarege: 342234.21,
    last: 342234.21
  }
}

export default TableRow
