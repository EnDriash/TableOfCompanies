import React, { Component } from "react"

import "./App.scss"
import "../sass/variables.scss"
import "../sass/grid.scss"

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h4>Comapnies Table</h4>
        </header>
        <main>
          <p>Zadanie rekrutacyjne jedziemy</p>
        </main>
        <footer>
          <p>@Copyright by Jedrzej Siewierski Krawczyk</p>
        </footer>
      </div>
    )
  }
}

export default App
