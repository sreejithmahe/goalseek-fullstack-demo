import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PostForm  from './components/PostForm';



class App extends Component{
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         &nbsp;
        </p>
         Goalseek Demo
       </header>
       <PostForm></PostForm>
    </div>
  );
}
}
export default App;
