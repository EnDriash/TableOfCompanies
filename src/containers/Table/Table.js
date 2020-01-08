import React from "react"
import "./Table.scss"
import TableRowContainer from "./TableRowContainer/TableRowContainer"

function Table(props) {
  // eslint-disable-next-line react/prop-types
  const { data, onSort } = props
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                onSort("id")
              }}
            >
              ID
            </th>
            <th
              onClick={() => {
                onSort("name")
              }}
            >
              Name
            </th>
            <th
              onClick={() => {
                onSort("city")
              }}
            >
              City
            </th>
            <th
              onClick={() => {
                onSort("sum")
              }}
            >
              Total
            </th>
            <th
              onClick={() => {
                onSort("average")
              }}
            >
              Average
            </th>
            <th
              onClick={() => {
                onSort("last")
              }}
            >
              Last
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRowContainer data={data} />
        </tbody>
      </table>
    </div>
  )
}

export default Table
