import './List.css'
import React from 'react'
import InfiniteScroll from '../../UI/InfiniteScroll'
import api from '../../../api/APIUtils'
import { Link } from 'react-router-dom'
import Card from './Card'
import Loading from '../../loading/Loading'

const urlBaseImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

class List extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            pokemons: [],
            range: 11
        }
        this.fetchMore = this.fetchMore.bind(this)
    }

    async componentDidMount()
    {
        await this.allPokemons()
    }

    async allPokemons()
    {
        const {data: {results}, loading} = await api.load({
            isDebounced: true,
            params: {
                limit: this.state.range,
            }
        })

        const pokemons = await this.getSpecies(results)
        this.setState({
            pokemons: pokemons,
            loading
        })
    }

    async fetchMore()
    {
        let {range} = this.state
        
        range += 20
        
        let {data: {results}} = await api.load({
            isDebounced: false,
            params: {
                limit: range
            }
        })
        const pokemons = await this.getSpecies(results)

        this.setState({
            pokemons: pokemons,
            range
        })
    }

    getSpecies(pokemons)
    {
        let arr = []
        return new Promise(async resolve => {
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

    render ()
    {
        const {pokemons, loading, range} = this.state
        
        return (
            <>
                {
                    !loading && (
                        <Loading />
                    )
                }
                <div className="container-list">
                    {
                        loading && (
                            pokemons.map(({id, name, color, sprite}, key) => {
                                return (
                                    <div key={key}>
                                        <Link key={key} to={`pokemon/${name}`}>
                                            <Card id={id} color={color} sprite={sprite}/>
                                        </Link>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                {
                    loading &&
                    range < 151 && (
                        <div>
                            <InfiniteScroll fetchMore={this.fetchMore}/>
                        </div>
                    )
                }
            </>
        )
    }
}

export default List