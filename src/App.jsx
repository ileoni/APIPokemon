import './App.css';
import React from 'react';

import Main from './main/template/Main'

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
