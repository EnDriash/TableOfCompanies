/* eslint-disable react/prop-types */
import React from "react"

import "./TableRowContainer.scss"

import Auxilliary from "../../../hoc/Auxilliary"
import TableRow from "../../../components/TableRow/TableRow"

const TableRowContainer = ({ data }) => {
  return (
    <Auxilliary>
      {data.map(elem => {
        return <TableRow key={elem.id} data={elem} />
      })}
    </Auxilliary>
  )
}

export default TableRowContainer
