import React, { Component } from "react"

import "./App.scss"
import "../sass/variables.scss"
import "../sass/grid.scss"

import Table from "./Table/Table"

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h4>Companies Table</h4>
        </header>
        <main>
          <Table />
        </main>
        <footer>
          <p>@Copyright by Jedrzej Siewierski Krawczyk</p>
        </footer>
      </div>
    )
  }
}

export default App
