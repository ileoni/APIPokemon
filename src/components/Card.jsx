import './Card.css'
import React from 'react'
import {Link} from 'react-router-dom'

class Card extends React.Component
{
    render()
    {
        const {id, name, color, sprite} = this.props
        return (
            <>
            <Link to={`pokemon/${name}`}>
                <li className={`container-card-2 pokemon-${color.name}`}>
                    <span className="number">
                        {id}
                    </span>
                    <div className="image">
                        <img src={sprite} alt={id} />
                    </div>
                </li>
            </Link>
            </>
        )
    }
}

export default Card