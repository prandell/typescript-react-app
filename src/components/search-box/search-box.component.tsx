import { ChangeEvent } from 'react'
import './search-box.styles.css'

export type SearchBoxProps = {
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
}

const SearchBox = ({
  onChangeHandler,
  className,
  placeholder
}: SearchBoxProps): JSX.Element => {
  return (
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder ? placeholder : 'search ...'}
      onChange={onChangeHandler}
    />
  )
}

export default SearchBox
