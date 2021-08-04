import React from 'react';
import './App.css';

import Main from './template/Main'

class App extends React.Component
{ 
  render ()
  {
    return (
      <>
      <div className="app">
        <Main/>
      </div>
      </>
    )
  }
}

export default App;
