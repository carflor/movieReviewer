import React from 'react';
import './App.css';
import Nav from './Components/Nav';

class App extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <main className="App">
        <Nav />
        {/* logo + title + search form + loginBTN */}
        {/* <Body /> */}
        {/* renders all the movies with ratings */}
      </main>
    );
  }
}

export default App;
