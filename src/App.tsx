import React, { ChangeEvent, Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Monster } from './models/monsters'

type RootState = {
  searchString: string
  monsters: Monster[]
  time: Date
}

class App extends Component<{}, RootState> {
  constructor(props: any) {
    super(props)

    this.state = {
      searchString: '',
      monsters: [],
      time: new Date()
    }
  }

  // Happens asynchronously because an object is passed
  tick(): void {
    this.setState({ time: new Date() })
  }

  onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchString: event.target.value.toLowerCase() })
  }

  getFilteredMonsters() {
    return this.state.monsters
      .filter((m: Monster) =>
        m.name.toLowerCase().includes(this.state.searchString)
      )
      .map((m: Monster) => {
        return (
          <div key={m.id}>
            <h1> {m.name} </h1>
          </div>
        )
      })
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((r) => r.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users }
        })
      )
    setInterval(() => this.tick(), 1000)
  }

  render() {
    const { monsters, time, searchString } = this.state
    const { onSearchChange } = this
    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search monsters ..."
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onSearchChange(event)
          }
        />
        {monsters
          .filter((m: Monster) => m.name.toLowerCase().includes(searchString))
          .map((m: Monster) => {
            return (
              <div key={m.id}>
                <h1> {m.name} </h1>
              </div>
            )
          })}
        <p>The time is {time.toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default App
