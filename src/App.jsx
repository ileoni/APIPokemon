import React from 'react';
import './App.css';

import Main from './main/template/Main'

class App extends React.Component
{ 
  render ()
  {
    return (
      <>
      <div className="app">
        <h1>ola</h1>
        <Main/>
      </div>
      </>
    )
  }
}

export default App;
