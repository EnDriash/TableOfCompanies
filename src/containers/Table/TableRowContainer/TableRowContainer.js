/* eslint-disable react/prop-types */
import React from "react"

import "./TableRowContainer.scss"

import Auxilliary from "../../../hoc/Auxilliary"
import TableRowComponent from "../../../components/TableRowComponent/TableRowComponent"

const TableRowContainer = ({ data }) => {
  return (
    <Auxilliary>
      {data.map(elem => {
        return <TableRowComponent key={elem.id} data={elem} />
      })}
    </Auxilliary>
  )
}

export default TableRowContainer
