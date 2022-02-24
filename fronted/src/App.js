import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from 'axios';

class App extends React.component {
  constructor(props) {
    super(props)
    this.state = {'authors': []
    }
  }
  componentDidMount() {
    const authors = axios.get('http://localhost:8000/api/users/').then(response =>
    {const authors = response.data
    })
  }
}

export default App;
