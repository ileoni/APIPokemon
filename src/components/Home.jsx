import './Home.css'
import React from 'react'
import List from './List'
import Lab from '../assets/svg/OakLab.jsx'

class Home extends React.Component
{
    render()
    {
        const fav = window.localStorage.getItem('fav')

        return (
            <div className="">
                <div id="home" className="pokemon-bg">
                    <div className="container-title">
                        <span className="title">
                            Pokedex
                        </span>
                        <span className="subtitle">
                            Desenvolvido em ReactJs
                        </span>
                    </div>
                    <Lab/>
                </div>
                <div id="pokedex" className="pokemon-list">
                    <span className="title">
                        Pokemons
                    </span>
                    <div className="list">
                        <List/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home