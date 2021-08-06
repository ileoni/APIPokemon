import React from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import List from '../components/pokemon/list/List'
import Page from '../components/pokemon/page/Page'

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
                        component={List}
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