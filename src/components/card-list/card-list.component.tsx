import { Monster } from '../../models/monsters'
import Card from '../card/card.component'
import './card-list.styles.css'

export type CardListProps = {
  monsters: Monster[]
}

const CardList = ({ monsters }: CardListProps): JSX.Element => {
  return (
    <div className="card-list">
      {monsters.map((m: Monster) => {
        return <Card monster={m} />
      })}
    </div>
  )
}

export default CardList
