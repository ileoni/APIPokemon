import React from 'react'
import {
    BrowserRouter
} from 'react-router-dom'
import Routes from '../../route/Routes'

class Main extends React.Component
{
    render()
    {
        return (
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        )
    }
}

export default Main