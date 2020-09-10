import React, { Component } from 'react';
import './App.css';
import Functions from './logic/Functions';
import About from './Components/About';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      size:[25, 25],
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
              <button className="submit start" onClick={this.startGame}>Start</button>
              <button className="submit stop" onClick={this.stopGame}>Stop</button>
              <button className="submit reset" onClick={this.resetGame}>Reset Game</button>
            </div>
          <div className = "generationContainer">
          <label className="label">
              Generation: {this.state.functions.getGeneration()}
          </label>
         <label className="label">
              Interval Speed: 
              <input className="input" value={this.state.interval} onChange={this.userInterval} />
         </label>
          </div>
          <div className="boardContainer">
            {this.renderBoard()}
          </div>
        </div>
        <div className="mainAboutContainer">
        <About />
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
