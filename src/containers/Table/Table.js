import React, { Component } from "react"
import axios from "axios"
import "./Table.scss"
import TableRowContainer from "./TableRowContainer/TableRowContainer"

class Table extends Component {
  state = {
    data: [],
    sort: {
      cat: "id",
      isIncrease: true
    }
  }

  componentDidMount() {
    this.initApp()
  }

  initApp() {
    let data
    let sum
    let average
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
            average = Math.round((sum / incomes.length) * 100) / 100
            last = lastIncomeFinder(incomes)
            return { ...elem, sum, average, last }
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

  sortHandler(header) {
    // eslint-disable-next-line prefer-const
    let { data, sort } = this.state
    if (sort.cat !== header) {
      if (header === "name" || header === "city") {
        data = data.sort()
        data = data.sort((a, b) => {
          return a[header].localeCompare(b[header])
        })
        this.setState({ data, sort: { cat: header, isIncrease: true } })
      } else {
        data = data.sort((a, b) => {
          return a[header] - b[header]
        })
        this.setState({ data, sort: { cat: header, isIncrease: true } })
      }
    } else {
      data = data.reverse()
      this.setState(state => ({
        data,
        sort: { cat: header, isIncrease: !state.isIncrease }
      }))
    }
  }

  render() {
    const { data } = this.state
    return (
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th
                onClick={() => {
                  this.sortHandler("id")
                }}
              >
                ID
              </th>
              <th
                onClick={() => {
                  this.sortHandler("name")
                }}
              >
                Name
              </th>
              <th
                onClick={() => {
                  this.sortHandler("city")
                }}
              >
                City
              </th>
              <th
                onClick={() => {
                  this.sortHandler("sum")
                }}
              >
                Total
              </th>
              <th
                onClick={() => {
                  this.sortHandler("average")
                }}
              >
                Average
              </th>
              <th
                onClick={() => {
                  this.sortHandler("last")
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
}

export default Table
