import './Page.css'
import React from 'react'
import axios from 'axios'

import api from '../../../api/APIUtils'

import Radar from '../../chart/Radar'
import Carousel, {Slide} from '../../carousel/Carousel'
import {Image} from '../../../assets/img/js/index'
import {FaCaretLeft, FaCaretRight} from 'react-icons/fa'
import Loading from '../../loading/Loading'


class Page extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            pokemon: {},
            config: {
                baseURL: "https://pokeapi.co/api/v2",
                method: "GET"
            }
        }
    }
    
    async componentDidMount()
    {
        const {params} = this.props.match
        const {data, loading} = await api.findPokemonSpecie(params.id)
        
        const {
            id, color, name, flavor_text_entries, evolution_chain, varieties, genera
        } = data

        const { 
            sprites, types, height, weight, abilities, stats
        } = await api.getPokemonByName(varieties)

        const evolution = await this.getEvolution(evolution_chain)
        
        this.setState({
            loading: loading,
            pokemon: {
                id: id.toString().padStart(3, 0),
                name,
                color,
                flavor: flavor_text_entries[10],
                sprites,
                types,
                height,
                weight,
                genera: genera[7],
                abilities: abilities[0],
                stats,
                evolution
            } 
        })
    }

    async getEvolution({url})
    {
        const {data} = await axios(url)
        const {evolves_to} = data.chain
        
        if(!evolves_to.length) return

        const first =  data.chain
        const second = this.getSpecie(data.chain.evolves_to)
        const third = this.getSpecie(second.evolves_to)

        let firstImg = first ? first.species.name: null
        let secondImg = second ? second.species.name: null
        let thirdImg = third ? third.species.name: null

        return {
            first: {
                name: firstImg,
                sprite: await api.getPokemonImage(firstImg)
            },
            second: {
                name: secondImg,
                sprite: await api.getPokemonImage(secondImg)
            },
            third: {
                name: thirdImg,
                sprite: await api.getPokemonImage(thirdImg)
            },
        }
    }

    getSpecie(specie)
    {
        const [species] = specie
        return species
    }

    render ()
    {
        const {pokemon, loading} = this.state
        const config = {
            left: {
                action: 'plus',
                color: 'white',
                fontSize: '1.8rem',
                icon: <FaCaretLeft/>
            },
            right: {
                action: 'minus',
                color: 'white',
                fontSize: '1.8rem',
                icon: <FaCaretRight/>
            }
        }

        return (
            <>
            <div>
                {
                    !loading && (
                        <Loading/>
                    )
                }
                {
                    loading && (
                        <div className="pokemon-container">
                            <div className={`c-1 ${pokemon.color?.name}`}>
                                <span className="number">
                                    {pokemon.id}
                                </span>
                                <span className="name">
                                    {pokemon.name}
                                </span>
                            </div>
                            <div className={`c-2 ${pokemon.color?.name}`}>
                                <div className="image">
                                    <img 
                                        src={pokemon.sprites?.other['official-artwork'].front_default} 
                                        alt={pokemon.name} />
                                </div>
                            </div>
                            <div className={`c-3 ${pokemon.color?.name}`}>
                                <p>
                                    {pokemon.flavor?.flavor_text}
                                </p>
                            </div>
                            <div className={`c-4 ${pokemon.color?.name}`}>
                                {
                                    pokemon.types &&
                                    pokemon.types.map( ({type}, key) => {
                                        return (
                                            <div key={key}>
                                                <Image type={type.name}/>
                                                <span className="type">{type.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={`c-5 ${pokemon.color?.name}`}>
                                <div>
                                    Height <span>{pokemon.height}</span>
                                </div>
                                <div>
                                    Weight <span>{pokemon.weight}</span>
                                </div>
                                <div>
                                    Category <span>{pokemon.genera?.genus}</span>
                                </div>
                                <div>
                                    Abilities <span>{pokemon.abilities?.ability.name}</span>
                                </div>
                            </div>
                            <div className={`c-6 ${pokemon.color?.name}`}>
                                {
                                    pokemon.stats &&
                                    <Radar stats={pokemon.stats}/>
                                }
                            </div>
                            <div className={`c-7 ${pokemon.color?.name}`}>
                                {
                                    pokemon.evolution && (
                                        <Carousel {...config}>
                                            <Slide 
                                                name={pokemon.evolution.first.name} 
                                                image={pokemon.evolution.first.sprite}/>
                                            <Slide 
                                                name={pokemon.evolution.second.name}
                                                image={pokemon.evolution.second.sprite}/>
                                            <Slide 
                                                name={pokemon.evolution.third.name} 
                                                image={pokemon.evolution.third.sprite}/>
                                        </Carousel>
                                    )
                                }
                            </div>
                        </div>                    
                    )
                }
            </div>
            </>
        )
    }
}

export default Page