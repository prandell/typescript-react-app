import React, { ChangeEvent, Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Monster } from './models/monsters'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

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

  onMonstersSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchString: event.target.value.toLowerCase() })
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
    const { onMonstersSearchChange, state } = this
    const { monsters, time, searchString } = state
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onMonstersSearchChange}
          placeholder="search monsters ..."
          className="monsters-search-box"
        />
        <CardList
          monsters={monsters.filter((m: Monster) =>
            m.name.toLowerCase().includes(searchString)
          )}
        />
        <p>The time is {time.toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default App
