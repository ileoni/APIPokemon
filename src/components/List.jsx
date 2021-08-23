import './List.css'
import React from 'react'
import api from '../util/Api'
import Card from './Card'
import InfiniteScroll from './UI/InfiniteScroll'

class List extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            list: [],
            offset: 0,
            limit: 20,
            loading: false
        }
        this.fetchMore = this.fetchMore.bind(this)
    }
    componentDidMount()
    {
        this.getPokemons()
    }
    async getPokemons()
    {
        const {offset, limit} = this.state
        const {data: {results: species}, loading} = await api.load({
            isDebounced: true,
            delay: 600,
            offset,
            limit
        })
        
        let pokemons = await this.getPokemonBy(species)

        this.setState({
            list: pokemons,
            loading: loading
        })
    }
    async fetchMore()
    {
        let {list, offset} = this.state
        
        offset += list.length === 140 ? 11: 20

        const {data: {results: species}, loading} = await api.load({
            isDebounced: true,
            delay: 300,
            offset: offset
        })
        
        let newPokemons = await this.getPokemonBy(species)

        this.setState({
            list: list.concat(newPokemons),
            offset: offset,
            loading: loading
        })
    }
    getPokemonBy(species)
    {
        let arrSpecies = []

        return new Promise( async (resolve, reject) => {
            try {
                for (const {name: pokemonName} of species) {
                    const {data: {id, name, color}} = await api.getSpecie({isDebounced: false, id: pokemonName})
                    
                    arrSpecies.push({
                        id: id.toString().padStart(3, '0'), name, color, sprite: api.getImage(id)
                    })
                }

                resolve(arrSpecies)
            } catch (e) {
                reject(e)
            }
        })
    }
    render()
    {
        const {list, loading} = this.state
        
        return (
            <>
            <div className="container-list-2">
                {
                    loading && (
                        list.map((pokemon, key) => {
                            return <Card key={key} {...pokemon}/>
                        })
                    )
                }
            </div>
            {
                loading &&
                list.length < 151 && (
                    <>
                        <InfiniteScroll fetchMore={this.fetchMore}/>
                        <div style={{height: '5rem', textAlign: 'center'}}>
                            ... loading
                        </div>
                    </>
                )
            }
            </>
        )
    }
}

export default List