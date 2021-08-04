import './Card.css';
import React from 'react';
import axios from 'axios';

class Card extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            config: {
                baseURL: 'https://pokeapi.co/api/v2/',
                method: 'GET',
            },
            pokemon: {},
            loading: false
        }
    }
    
    getPokemon()
    {
        const {url} = this.props
        return axios(url)
    }
    
    getSpecies()
    {
        const {config} = this.state
        const {name} = this.props

        return axios({
            ...config,
            url: `/pokemon-species/${name}`
        })
    }

    async componentDidMount()
    {
        Promise.all([this.getPokemon(), this.getSpecies()])
        .then( results => {
            const {id, name, types, sprites} = results[0].data
            const {color} = results[1].data
            const stringId = id.toString().padStart(3, '0');

            this.setState({
                pokemon: {
                    id: stringId,
                    name,
                    types,
                    sprites,
                    color
                }
            })
        })
    }

    render ()
    {
        const {pokemon} = this.state;
        
        return (
            <>
            <div className={`container-card ${pokemon.color?.name}`}>
                <div className="feature">
                    <span className="number">
                        {pokemon.id}
                    </span>
                </div>
                <div className="image">
                        <img
                            src={pokemon.sprites?.other["official-artwork"].front_default}
                            alt={pokemon.name}
                        />
                </div>
            </div>
            </>
        )
    }
}

export default Card