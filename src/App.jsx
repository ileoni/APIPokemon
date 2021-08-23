import './App.css';
import React from 'react';

import Main from './main/template/Main'
import Nav from './main/template/Nav'

class App extends React.Component
{ 
  render ()
  {
    return (
      <>
      <div className="app">
        <aside className="side-nav">
          <Nav/>
        </aside>
        <main className="content">
          <Main/>
        </main>
      </div>
      </>
    )
  }
}

export default App;
