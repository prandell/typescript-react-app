import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Monster } from './models/monsters'

type RootState = {
  monsters: Monster[]
  time: Date
}

class App extends Component<{}, RootState> {
  constructor(props: any) {
    super(props)

    this.state = {
      monsters: [],
      time: new Date()
    }
  }

  // Happens asynchronously because an object is passed
  tick(): void {
    this.setState({ time: new Date() })
  }

  // Can react to the update when its made with function callback. Log will be updated state
  updateMonsters(): void {
    this.setState(
      (state: RootState, props: any) => {
        return { time: state.time }
      },
      () => {
        console.log(this.state)
      }
    )
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
    return (
      <div className="App">
        <header className="App-header">
          {this.state.monsters.map((m: Monster) => {
            return (
              <div key={m.id}>
                <h1> {m.name} </h1>
              </div>
            )
          })}
          <img src={logo} className="App-logo" alt="logo" />
          <p>The time is {this.state.time.toLocaleTimeString()}</p>
          <button onClick={() => this.updateMonsters()}>Change Name</button>
        </header>
      </div>
    )
  }
}

export default App
