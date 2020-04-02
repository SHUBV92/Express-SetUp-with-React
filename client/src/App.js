import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { 
    response: '',
    res2: '',
    login:'',
    post: '',
    responseToPost: ''
  }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));

    this.example()
    .then(res =>this.setState({res2: res.route }))
    .catch(err => console.log(err));

    // this.login()
    // .then(res => this.setState({login: res.}))

  }
  
  callApi = async () => { 
    const response = await fetch('api/hello');
    const body = await response.json();
    if(response.status !== 200 ) throw Error(body.message);

    return body; 
  }

  login = async () => {
    const response = await fetch('/api/login');
    const body = await response.json();
    if( response.status !== 200 ) throw Error(body.message);
    return body
  }

  handleRedirect = () => {
    window.location = "http://localhost:8888/callback"
  }

  example = async () => { 
    const example = await fetch('/api/example');
    const body = await example.json();
    if(example.status !== 200 ) throw Error(body.message);

    return body; 
  }

  handleSubmit = async e => { 
    e.preventDefault();
    const response = await fetch('/api/world', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ post: this.state.post})
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{this.state.response}</p>
      <p>{this.state.res2}</p>
      <form onSubmit={this.handleSubmit}>
      <p>
        <strong>Post to Server</strong>
        </p>
        <input 
          type="text"
          value={this.state.post}
          onChange={e=>this.setState({post : e.target.value})}
          />
          <button type="submit">Submit</button>
        </form>
          <p>{this.state.responseToPost}</p>
    <button onClick={this.handleRedirect}>Log in with Spotify</button>
    </div>
  );
  }
}

export default App;
