import React, { ChangeEvent, Component } from 'react'
import { Monster } from '../../models/monsters'
import Card from '../card/card.component'
import './card-list.styles.css'

export type CardListProps = {
  monsters: Monster[]
}

export type CardListState = {}

class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props)

    this.state = {}
  }

  render() {
    const { monsters } = this.props
    return (
      <div className="card-list">
        {monsters.map((m: Monster) => {
          return <Card monster={m} />
        })}
      </div>
    )
  }
}

export default CardList
