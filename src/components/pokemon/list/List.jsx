import './List.css'
import React from 'react'
import {Link} from 'react-router-dom'
import api from '../../../api/APIUtils'
import Card from './Card'
import Loading from '../../loading/Loading' 
import InfiniteScroll from '../../UI/InfiniteScroll'

class List extends React.Component
{
    constructor(props)
    {
        super(props)
        this.fetchMore = this.fetchMore.bind(this)
        this.state = {
            pokemons: [],
            loading: false,
            range: 20
        }
    }
    
    async componentDidMount ()
    {
        this.allPokemons();
        this.fetchMore()
    }

    async allPokemons()
    {
        const {data, loading} = await api.allPokemons(false)
        const {results} = data
        
        this.setState({
            pokemons: results,
            loading
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
        const {pokemons, loading, range} = this.state
        return (
            <>
                {
                    !loading && (
                        <Loading/>
                    )
                }
                {
                    loading && (
                        <div className="container-list">
                            {
                                pokemons.slice(0, range).map((pokemon, key) => {
                                    return (
                                        <Link key={key} to={`pokemon/${pokemon.name}`}>
                                            <Card {...pokemon}/>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    )
                }
                <InfiniteScroll fetchMore={this.fetchMore}/>
            </>
        )
    }
}

export default List