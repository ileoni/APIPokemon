import './Card.css';
import React from 'react';

class Card extends React.Component
{
    render ()
    {
        const {id, sprite, color} = this.props

        return (
            <>
            <div className={`container-card ${color.name}`}>
                <div className="feature">
                    <span className="number">
                        {id}
                    </span>
                </div>
                <div className="image">
                        <img
                            src={sprite}
                            alt={id}
                        />
                </div>
            </div>
            </>
        )
    }
}

export default Card