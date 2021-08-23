import './Page.css'
import React from 'react'
import api from '../util/Api'
import {Image} from '../assets/img/js/index'
import Radar from './chart/Radar'
import Carousel from './pokemon/Carousel'

const baseUrlImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

class Page extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            list: {}
        }
    }
    async componentDidMount()
    {   

        const {params: {id: pokemonName}} = this.props.match
        const {data: {id, name, color, flavor_text_entries, genera, evolution_chain}} = await api.getSpecie({
            isDebounced: false,
            id: pokemonName
        })

        const {data: {types, height, weight, abilities, stats, sprites}} = await api.getPokemon({
            isDebounced: false,
            id: pokemonName
        })

        const evolution = await this.getEvolution(evolution_chain)

        this.setState({
            list: {
                id,
                name,
                color,
                flavorTextEntries: flavor_text_entries[10],
                genera: genera[7],
                types,
                height,
                weight,
                abilities: abilities[0],
                stats,
                sprites,
                evolution
            }
        })
   
    }
    
    async getEvolution(evolutionChain)
    {
        const {data: {chain}} = await api.getEvolution({
            isDebounced: false,
            url: evolutionChain.url
        })
        
        if(!chain.evolves_to.length) return

        const {species: first, evolves_to: firstStep} = chain
        const [{species: second, evolves_to: secondStep}] = firstStep
        
        let third = {}
        if(secondStep.length) [{species: third }] = secondStep

        return [
            this.handle(first),
            this.handle(second),
            this.handle(third)
        ]
    }
    handle({name, url})
    {
        if(!url) return null
        url = url.split("/")[6]
        
        return {
            name,
            sprites: baseUrlImage.concat(url, '.png')
        }
    }
    render()
    {
        const {list} = this.state;

        return (
            <>
                <div className="pokemon-container">
                    <div className={`c-1 pokemon-${list.color?.name}`}>
                        <span className="number">
                            {list.id}
                        </span>
                        <span className="name">
                            {list.name}
                        </span>
                    </div>
                    <div className={`c-2 pokemon-${list.color?.name}`}>
                        <div className="image">
                            <img src={list.sprites?.other['official-artwork'].front_default} alt={list.id} />
                        </div>
                    </div>
                    <div className={`c-3 pokemon-${list.color?.name}`}>
                        {list.flavorTextEntries?.flavor_text}
                    </div>
                    <div className={`c-4 pokemon-${list.color?.name}`}>
                        {
                            list.types &&
                            list.types.map(({type}, key) => {
                                return (
                                    <div key={key}>
                                        <Image type={type.name}/>
                                        <span className="type">{type.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`c-5 pokemon-${list.color?.name}`}>
                        <div>
                            Height <span>{list.height}</span>
                        </div>
                        <div>
                            Weight <span>{list.weight}</span>
                        </div>
                        <div>
                            Category <span>{list.genera?.genus}</span>
                        </div>
                        <div>
                            Abilities <span>{list.abilities?.ability.name}</span>
                        </div>
                    </div>
                    <div className={`c-6 pokemon-${list.color?.name}`}>
                        {
                            list.stats &&
                            <Radar stats={list.stats}/>
                        }
                    </div>
                    <div className={`c-7 pokemon-${list.color?.name}`}>
                        {
                            list.evolution && (
                                <Carousel list={list.evolution} {...this.props}/>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Page