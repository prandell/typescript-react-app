import { ChangeEvent, useState, useEffect } from 'react'
import './App.css'
import { Monster } from './models/monsters'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

const App = (): JSX.Element => {
  const [searchString, setSearchString] = useState('')
  const [monsters, setMonsters] = useState([])
  const [time, setTime] = useState(new Date())

  const tick = () => {
    setTime(new Date())
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((r) => r.json())
      .then((users) => setMonsters(users))
  }, [])

  useEffect(() => {
    setInterval(() => tick(), 1000)
  }, [])

  const onMonstersSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setSearchString(searchString)
  }

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

export default App
