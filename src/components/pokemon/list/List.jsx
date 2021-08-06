import './List.css'
import React from 'react'
import {Link} from 'react-router-dom'
import api from '../../../api/APIUtils'
import Card from './Card'
import Loading from '../../loading/Loading' 
import InfiniteScroll from '../../UI/InfiniteScroll'

const urlBaseImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

class List extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            pokemons: [],
            range: 20,
            loading: false
        }
        this.fetchMore = this.fetchMore.bind(this)
    }

    async componentDidMount ()
    {
        await this.allPokemons()
    }

    async allPokemons()
    {
        const {data: {results}} = await api.allPokemons(false)
        const pokemons = await this.getSpecies(results)

        this.setState({
            pokemons: pokemons,
            loading: true
        })
    }

    getSpecies(pokemons)
    {
        let arr = []
        return new Promise( async resolve => {
            for (let {name: namePokemon} of pokemons) {
                const {data: {id, name, color}} = await api.findPokemonSpecie(namePokemon, false)
             
                arr.push({
                    id: id.toString().padStart(3, '0'),
                    name,
                    color,
                    sprite: urlBaseImage.concat(id, '.png')
                })    
            }

            resolve(arr)
        })
    }

    async fetchMore()
    {
        let newRange = (this.state.range + 10)

        this.setState({
            range: newRange
        })
    }

    render ()
    {
        const {pokemons, range, loading} = this.state

        return (
            <>
                {
                    !loading && (
                        <Loading/>
                    )
                }
                <div className="container-list">
                    {
                        loading && (
                            <>
                                {
                                    pokemons.slice(0, range).map(({id, name, color, sprite}, key) => {
                                        return (
                                            <Link key={key} to={`pokemon/${name}`}>
                                                <Card id={id} color={color} sprite={sprite}/>
                                            </Link>
                                        )
                                    })
                                }
                                <InfiniteScroll fetchMore={this.fetchMore}/>
                            </>
                        )
                    }
                </div>    
            </>
        )
    }
}

export default List