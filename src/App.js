import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import Body from './Components/Body';

class App extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <main className="App">
        <Nav />
        <Body />
        {/* renders all the movies with ratings */}
      </main>
    );
  }
}

export default App;
