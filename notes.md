# Notes on React

## React Basic Concepts

- The only time state changes are re-rendered is when the entire state object changes (`setState`)
- `setState` shallow merges the current state with the keys passed in
- `eventHandlers` must call class functions as anonymous functions, or those functions must be manually
  bound in the constructor (`.bind(this)`)
- `setState` can update state values to be completely different types or Objects
- `setState` can be used with a call back, so that the log in this example logs directly after state update

```
    this.setState(
      (state: RootState, props: any) => {
        return { time: state.time }
      },
      () => {
        console.log(this.state)
      }
    )
```

- React batches (optimises) `setState` calls and therefore logging state may be delayed
- When using array maps to render seperate html elements, make sure to include a `key`
- Any CSS file imported throughout the application is present **everywhere** in the application. You have to be conscious of overlapping styles for the same className

## Lifecycle Methods

![alt text](/imgs/lifecycle_methods_diagram.png)

- `componentDidMount()`: Code that will run when component mounts (first time it gets rendered onto the DOM). After `constructor()` and `render()`.
- Props changing triggers a componenet re-render.
- Functional Components do follow phases, but don't have the explicit functions that class components do.

## Functional Components vs. Class Components

- `const App = () => {}` is the basic boilerplate of a functional component

  - The input parameters are the props.

- Functional components are re-run in their entirity when react decides a re-render is required
- ### Functions, Impure Functions, and Side-effects

  - a pure function is one that returns the same value for the same input. Mathematical functions are examples of pure functions.
  - a function that returns you the time is not a pure function
  - TL;DR Impure functions that depend on variables outside the function scope and props
  - a side effect is when a function that alters a variable outside it's scope

- `useState()` is how functional components declare state variables that can trigger re-renders
- `useEffect()` is how functional components define actions to perform conditionally (only once, or only when dependencies update)
- React is clever enough to know that even if setState is called and the value is the same, no re-render takes place

### App as a functional Component

```
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
```

### App as a Class Component

```
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
```
