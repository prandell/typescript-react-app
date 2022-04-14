import React, { ChangeEvent, Component } from 'react'
import './search-box.styles.css'

export type SearchBoxProps = {
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
}

export type SearchBoxState = {}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
  constructor(props: SearchBoxProps) {
    super(props)

    this.state = {}
  }

  render() {
    const { onChangeHandler, className, placeholder } = this.props
    return (
      <input
        className={`search-box ${className}`}
        type="search"
        placeholder={placeholder ? placeholder : 'search ...'}
        onChange={onChangeHandler}
      />
    )
  }
}

export default SearchBox
