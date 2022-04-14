import { Monster } from '../../models/monsters'
import './card.styles.css'

export type CardProps = {
  monster: Monster
}

const Card = ({ monster }: CardProps): JSX.Element => {
  const { name, id, email } = monster
  return (
    <div className="card-container" key={id}>
      <img alt={`monster ${name}`} src={`/monsters/m${id}.png`}></img>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

export default Card
