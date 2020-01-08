import React, { Component } from "react"
import axios from "axios"
import "./Table.scss"
import TableRowContainer from "./TableRowContainer/TableRowContainer"

class Table extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.initApp()
  }

  initApp() {
    let data
    let sum
    let avarage
    let last

    const sumCounter = incomes => {
      let total = incomes.reduce((prev, elem) => {
        return prev + Number(elem.value)
      }, 0)
      total = Math.round(total * 100) / 100
      return total
    }

    const lastIncomeFinder = incomes => {
      const incomesSorted = incomes.sort((a, b) => {
        const dateA = Date.parse(a.date)
        const dateB = Date.parse(b.date)
        return dateB - dateA
      })

      const latestMonth = new Date(incomesSorted[0].date).getMonth()

      let lastMonthIncomes = incomesSorted
        .filter(elem => new Date(elem.date).getMonth() === latestMonth)
        .reduce((prev, elem) => prev + Number(elem.value), 0)
      lastMonthIncomes = Math.round(lastMonthIncomes * 100) / 100
      return lastMonthIncomes
    }

    axios("https://recruitment.hal.skygate.io/companies")
      .then(companies => {
        data = companies.data
        return data.map(elem => {
          return axios(
            `https://recruitment.hal.skygate.io/incomes/${elem.id}`
          ).then(resp => {
            const { incomes } = resp.data
            sum = sumCounter(incomes)
            avarage = Math.round((sum / incomes.length) * 100) / 100
            last = lastIncomeFinder(incomes)
            return { ...elem, sum, avarage, last }
          })
        })
      })
      .then(promises => {
        Promise.all(promises).then(incomes => {
          const response = incomes.sort((a, b) => {
            return a.id - b.id
          })
          this.setState({ data: response })
        })
      })
  }

  render() {
    const { data } = this.state
    return (
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Total</th>
              <th>Avarage</th>
              <th>Last</th>
            </tr>
          </thead>
          <tbody>
            <TableRowContainer data={data} />
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
