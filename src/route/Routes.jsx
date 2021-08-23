import React from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import Home from '../components/Home'
import Page from '../components/Page'

class Routes extends React.Component
{
    render()
    {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={Home}
                    />
                    <Route
                        exact
                        path="/pokemon/:id"
                        component={Page}
                    />
                </Switch>
            </Router>
        )
    }
}

export default Routes