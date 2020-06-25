import React, { Component } from 'react';
import './App.css';
import Functions from './logic/Functions';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      size:[0, 0],
      generation: 0,
      gameRunning: false,
      functions: new Functions(),
      interval: 0
    }

   

    // bind event handlers here
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.storeCell = this.storeCell.bind(this);
    this.userInterval = this.userInterval.bind(this);
    this.resetGame = this.resetGame.bind(this);
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

   userInterval(event){
    this.setState({interval: Number(event.target.value)});
    }
  

  startGame(){
    if(!this.state.gameRunning){
      this.setState({
        gameRunning: true
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), this.state.interval)
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
    this.setState({
      functions: this.state.functions.addGeneration()
    });
  }

  resetGame(event){
    event.preventDefault();
    this.setState({
      size:[25,25],
      functions: new Functions(),
      gameRunning: false,
      interval: 0      
    });
  }


  storeCell(position){
    if(!this.state.gameRunning){
      this.setState({
        functions: this.state.functions.storeCell(position)
      });
    }
  }

  renderBoard(){
    var board = [];
    var cell = [];

    for(var i = 0; i < this.state.size[0]; i++){
      for(var j = 0; j < this.state.size[1]; j++){
        if(this.state.functions.isCellAlive(i + " , " + j)){
        cell.push(<Cell key = {[i, j]} position={{x: i, y: j}} live = {true} storeCell={this.storeCell.bind(this)} />);
        } else{
          cell.push(<Cell key={[i, j]} position={{x: i, y: j}} live = {false} storeCell={this.storeCell.bind(this)} />)
        }
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
              <button className="submit" onClick={this.startGame}>Start</button>
              <button className="submit" onClick={this.stopGame}>Stop</button>
              <button className="submit" onClick={this.resetGame}>Reset Game</button>
            </div>
          <div className = "generationContainer">
          <label className="label">
              Generation: {this.state.functions.getGeneration()}
          </label>
         <label>
              Interval Speed: 
              <input className="input" value={this.state.interval} onChange={this.userInterval} />
         </label>
          </div>
          <div className="boardContainer">
            {this.renderBoard()}
          </div>
        </div>
        <div className="aboutContainer">
          <h3>About:</h3>
          <p>
          The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
          It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.
          One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
          It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns" target="_blank" rel="noopener noreferrer">Wikipedia Source</a>
          <h3>What Are The Rules?</h3>
          <p>
          The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). 
          Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. 
          <br/>
          At each step in time, the following transitions occur:
          </p>
          <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
          </ol>
          <p>
          These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
          </p>
          <ol>
            <li>Any live cell with two or three live neighbours survives.</li>
            <li>Any dead cell with three live neighbours becomes a live cell.</li>
            <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
          </ol>
          <p>
          The initial pattern constitutes the seed of the system.
          The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.
          Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.
          </p>
          </div>
      </div>
    </div>
  );
}
}

class Cell extends Component{
  render(){
    return(
      <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "cellContainerLive" : "cellContainerDead"}></div>
    )
  }
}

export default App;
