import React, { ChangeEvent, Component } from 'react'
import { Monster } from '../../models/monsters'
import './card.styles.css'

export type CardProps = {
  monster: Monster
}

export type CardState = {}

class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props)

    this.state = {}
  }

  render() {
    const { name, email, id } = this.props.monster
    return (
      <div className="card-container" key={id}>
        <img alt={`monster ${name}`} src={`/monsters/m${id}.png`}></img>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    )
  }
}

export default Card
