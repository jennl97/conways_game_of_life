import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      size:[],
      generation: 0,
      gameRunning: false
    
    }
    // bind event handlers here
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleGenerationsChange = this.handleGenerationsChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
  }

  //build event handlers
  handleRowChange(event){

    if(!this.state.gameRunning){
      var actualSize = this.state.size;

      if(event.target.value > 1){
        actualSize[1] = event.target.value;
      } else {
        actualSize[1] = 1;
      }
      this.setState({
        size: actualSize
      });

      this.renderBoard();
    }
  }

  handleColumnChange(event){
    if(!this.state.gameRunning){
      var actualSize = this.state.size;

      if(event.target.value > 1){
        actualSize[0] = event.target.value;
      } else {
        actualSize[0] = 1;
      }
      this.setState({
        size: actualSize
      });

      this.renderBoard();
    }
  }

  handleGenerationsChange(event){
    if(!this.state.gameRunning){
      var generation = this.state.generation;

      if(event.target.value > 0){
        generation = event.target.value;
      } else {
        generation = 0;
      }
    }

  }

  startGame(){
    if(!this.state.gameRunning){
      this.setState({
        gameRunning: true
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), 10)
      })
    }
  }

  stopGame(){
    this.setState({
      gameRunning: false
    }, () => {
      if(this.intervalRef){
        clearInterval(this.intervalRef);
      }
    })

  }

  runGame(){

  }

  renderBoard(){
    var board = [];
    var cell = [];

    for(var i = 0; i < this.state.size[0]; i++){
      for(var j = 0; j < this.state.size[1]; j++){
        cell.push(<Cell key = {[i, j]} />)
      }
      board.push(<div className='row' key= {i} > {cell}</div>);
      cell = [];
    }
    return board;
  }

  render(){
  return (
    <div className="App">
      <div className="mainContainer">
        <div className="header">
          <h1>Conway's Game of Life</h1>
          <div className="controlsContainer">
            <label className="label">
              Rows:
              <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
            </label>
            <label className="label">
              Columns:
              <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
            </label>
          </div>
          <div className="controlButtons">
              <button className="submit" onChange={this.startGame}>Start</button>
              <button className="submit" onChange={this.stopGame}>Stop</button>
            </div>
          <div className = "generationContainer">
          <label className="label">
              Generation: 
              <input className="input" type="text" value={this.state.generation[0]} onChange={this.handleGenerationsChange} />
            </label>
          </div>
          <div className="boardContainer">
            {this.renderBoard()}
          </div>
        </div>
      </div>
    </div>
  );
}
}

class Cell extends Component{
  render(){
    return(
      <div className = "cellContainer"></div>
    )
  }
}

export default App;
