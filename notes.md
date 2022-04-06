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

## Lifecycle Methods

- `componentDidMount()`: Code that will run when component mounts (first time it gets rendered onto the DOM).
