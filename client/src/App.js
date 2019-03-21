import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload';
import Images from './components/images';

class App extends Component {
  render() {
      return (
          <div>
              <Upload />
              <Images />
          </div>
      )
  }
}
export default App;
