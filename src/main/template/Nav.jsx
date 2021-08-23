import './Nav.css'
import React from 'react'
import {HashRouter as Router} from 'react-router-dom'
import {NavHashLink} from 'react-router-hash-link'
import {
    CgPokemon,
    CgHomeAlt,
    CgHeart
} from 'react-icons/cg'
import M from 'materialize-css'

class Nav extends React.Component
{
    componentDidMount()
    {
        const tooltip = document.querySelectorAll('.tooltipped')
        
        M.Tooltip.init(tooltip, {
            enterDelay: 200,
            margin: 10,
        })
    }

    render()
    {
        return (
            <Router>
                <nav>
                    <ul className="navbars">
                        <li>
                            <NavHashLink to="/#home">
                                <i className="tooltipped" data-position="right" data-tooltip="Home">
                                    <CgHomeAlt/>
                                </i>
                                <span>
                                    Home
                                </span>
                            </NavHashLink>
                        </li>
                        <li>
                            <NavHashLink to="/#pokedex">
                                <i  className="tooltipped" data-position="right" data-tooltip="Pokedex">
                                    <CgPokemon/>
                                </i>
                                <span>
                                    Pokedex
                                </span>
                            </NavHashLink>
                        </li>
                    </ul>
                </nav>
            </Router>
        )
    }
}

export default Nav