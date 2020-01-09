import React, { Component } from "react"
import axios from "axios"

import "./App.scss"
import "../sass/variables.scss"
import "../sass/grid.scss"
import paginate from "../utils/paginate"

import Table from "./Table/Table"
import Pagination from "../components/common/Pagination"

import SearchIcon from "../public/icons/search-solid"

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  state = {
    data: [],
    companies: [],
    pageSize: 50,
    currentPage: 1,
    sort: {
      cat: "id",
      isIncrease: true
    },
    search: ""
  }

  componentDidMount() {
    this.initApp()
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    })
  }

  // eslint-disable-next-line consistent-return
  searchHandler = event => {
    const { search, data } = this.state
    if (event.key === "Enter" || event.type === "click") {
      const searchedData = []

      data.forEach(elem => {
        if (
          elem.city.toLowerCase().includes(search) ||
          elem.name.toLowerCase().includes(search) ||
          elem.id === Number(search)
        ) {
          searchedData.push(elem)
        }
      })
      return searchedData.length !== 0
        ? this.setState({ companies: searchedData })
        : alert("Brak firm spełniających kryteria!")
    }
    this.setState({ search: event.target.value.toLowerCase() })
  }

  initApp() {
    let data
    let total
    let average
    let last

    const sumCounter = incomes => {
      total = incomes.reduce((prev, elem) => {
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
            total = sumCounter(incomes)
            average = Math.round((total / incomes.length) * 100) / 100
            last = lastIncomeFinder(incomes)
            return { ...elem, total, average, last }
          })
        })
      })
      .then(promises => {
        Promise.all(promises).then(incomes => {
          const response = incomes.sort((a, b) => {
            return a.id - b.id
          })
          this.setState({ data: response, companies: response })
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
      this.setState({ sort: { cat: header, isIncrease: !sort.isIncrease } })
    }
  }

  render() {
    const { companies, pageSize, currentPage, sort, search } = this.state
    const paginateCompanies = paginate(companies, currentPage, pageSize)
    return (
      <div className="App">
        <header>
          <h5>Table of Companies</h5>
        </header>
        <main>
          <Table
            data={paginateCompanies}
            onSort={e => this.sortHandler(e)}
            sort={sort}
          />
          <div className="NavPanel">
            <div className="search">
              <input
                className="search-input"
                type="text"
                placeholder="Name,city or id"
                value={search}
                onChange={this.searchHandler}
                onKeyDown={this.searchHandler}
              />
              <button type="submit" onClick={this.searchHandler}>
                <SearchIcon width={15} />
                <span>Search</span>
              </button>
            </div>
            <Pagination
              itemsCount={companies.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </main>
        <footer>
          <p>@Copyright by Jedrzej Siewierski Krawczyk</p>
        </footer>
      </div>
    )
  }
}

export default App
