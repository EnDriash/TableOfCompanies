import React from "react"
import "./TableRowComponent.scss"
import PropTypes from "prop-types"

function TableRowComponent({ data }) {
  return (
    <tr className="TableRowComponent">
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.city}</td>
      <td>{data.total}</td>
      <td>{data.average}</td>
      <td>{data.last}</td>
    </tr>
  )
}

TableRowComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    average: PropTypes.number.isRequired,
    last: PropTypes.number.isRequired
  })
}

TableRowComponent.defaultProps = {
  data: {
    id: 1,
    name: "Warsaw Comapny",
    city: "Warsaw",
    total: 342234.21,
    average: 342234.21,
    last: 342234.21
  }
}

export default TableRowComponent
