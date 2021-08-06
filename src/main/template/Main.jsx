import React from 'react'
import {
    HashRouter as Router
} from 'react-router-dom'
import Routes from '../../route/Routes'

class Main extends React.Component
{
    render()
    {
        return (
            <Router>
                <Routes/>
            </Router>
        )
    }
}

export default Main