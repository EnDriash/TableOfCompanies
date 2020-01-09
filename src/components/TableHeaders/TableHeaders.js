import React from "react"
import PropTypes from "prop-types"
import Auxilliary from "../../hoc/Auxilliary"

import UpArrow from "../../public/icons/chevron-up-solid"
import DownArrow from "../../public/icons/chevron-down-solid"

const headers = ["ID", "Name", "City", "Total", "Average", "Last"]

function TableHeaders({ onSort, activeHead }) {
  const theaders = headers.map((elem, id) => {
    let arrow
    if (elem.toLowerCase() === activeHead.cat) {
      if (activeHead.isIncrease) {
        arrow = <UpArrow width={10} />
      } else {
        arrow = <DownArrow width={10} />
      }
    }
    return (
      <th
        // NOTE: This data dosen't change order.
        // eslint-disable-next-line react/no-array-index-key
        key={id}
        onClick={() => {
          onSort(elem.toLowerCase())
        }}
      >
        {arrow}
        <span>{elem}</span>
      </th>
    )
  })

  return (
    <Auxilliary>
      <tr>{theaders}</tr>
    </Auxilliary>
  )
}

TableHeaders.propTypes = {
  onSort: PropTypes.func.isRequired,
  activeHead: PropTypes.objectOf(
    PropTypes.shape({
      cat: PropTypes.object.isRequired,
      isIncrease: PropTypes.bool.isRequired
    })
  )
}

TableHeaders.defaultProps = {
  activeHead: PropTypes.objectOf(
    PropTypes.shape({
      cat: "total",
      isIncrease: true
    })
  )
}
export default TableHeaders
