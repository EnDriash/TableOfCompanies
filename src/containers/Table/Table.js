import React from "react"
import "./Table.scss"

import TableRowContainer from "./TableRowContainer/TableRowContainer"
import TableHeaders from "../../components/TableHeaders/TableHeaders"

function Table(props) {
  // eslint-disable-next-line react/prop-types
  const { data, onSort, sort } = props
  return (
    <div className="Table">
      <table>
        <thead>
          <TableHeaders onSort={onSort} activeHead={sort} />
        </thead>
        <tbody>
          <TableRowContainer data={data} />
        </tbody>
      </table>
    </div>
  )
}

export default Table
