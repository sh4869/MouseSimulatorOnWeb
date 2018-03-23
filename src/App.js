import React, { Component } from 'react';
import './App.css';
import slove from './slover.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 80,
      mapsize: [8, 8],
      maze: [
        [0, 0, 1, 1], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0],
        [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 0, 0],
        [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 0, 0],
        [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 0, 0],
        [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 0, 0],
        [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 0, 0],
        [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 0, 0],
        [1, 0, 0, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 0, 0],
      ],
      goal: [[7, 7]],
      start: [[0, 0]],
      walkmap: [[]]
    }
  }

  onClick(e) {
    const x1 = parseInt(e.target.getAttribute("x1"), 10)
    const x2 = parseInt(e.target.getAttribute("x2"), 10)
    const y1 = parseInt(e.target.getAttribute("y1"), 10)
    const y2 = parseInt(e.target.getAttribute("y2"), 10)
    if (
      (x1 === x2 && (x1 === this.state.size * (this.state.mapsize[0]) || x1 === 0))
      ||
      (y1 === y2 && (y1 === this.state.size * (this.state.mapsize[1]) || (y1 === 0)))
    ) {
      console.log("This is Wall.")
      return;
    }
    // 横か縦かを調べる
    const x = (x1 / this.state.size);
    const y = 7 - (y1 / this.state.size);
    const isyoko = x2 > x1;
    const copystate = this.state.maze;
    if (isyoko) {
      let result = 1;
      if (this.state.maze[y * this.state.mapsize[1] + x][0]) {
        result = 0;
      }
      copystate[y * this.state.mapsize[1] + x][0] = result;
      copystate[(y + 1) * this.state.mapsize[1] + x][2] = result;
    } else {
      let result = 1;
      if (this.state.maze[y * this.state.mapsize[1] + x][3]) {
        result = 0;
      }
      copystate[y * this.state.mapsize[1] + x][3] = result;
      copystate[y * this.state.mapsize[1] + x - 1][1] = result;
    }
    this.setState({ maze: copystate })
  }
  updateGoal(e) {
    const x = parseInt(e.target.getAttribute("countx"), 10);
    const y = parseInt(e.target.getAttribute("county"), 10);
    console.log(x, y);
    let newgoal = this.state.goal;
    if (this.state.goal.some((v, i, a) => v[0] == x && v[1] == y)) {
      newgoal = this.state.goal.filter((v, i, a) => v[0] != x || v[1] != y);
    } else {
      newgoal.push([x, y]);
    }
    this.setState({ goal: newgoal });

  }
  outputMaze(e) {
    let log = "";
    this.state.maze.map((array) => {
      log += "[" + array.toString() + "],"
    })
    console.log(log)
  }

  sloveMazeinJs(e) {
    const wmap = slove(this.state.mapsize, this.state.maze, this.state.goal)
    console.log(wmap)
    this.setState({ walkmap: wmap })
  }

  render() {
    let x = -1, y = 1;
    const items = [];
    const fillsize = this.state.size * 0.9;
    for (let y = 0; y < this.state.mapsize[1]; y++) {
      for (let x = 0; x < this.state.mapsize[0]; x++) {
        items.push(<rect
          x={(x + 0.05) * this.state.size} y={(7 - y + 0.05) * this.state.size} width={fillsize} height={fillsize}
          onDoubleClick={this.updateGoal.bind(this)}
          countx={x} county={y}
          fill="white" fillOpacity="1"
          key={"map-white-" + x.toString() + "-" + y.toString()} />)
      }
    }
    return (
      <div className="App">
        <p className="App-title">{"Mouse Simulator"}</p>
        <svg version="1.1" width={this.state.size * this.state.mapsize[0] + 10} height={this.state.size * this.state.mapsize[1] + 10} xmlns="http://www.w3.org/2000/svg">
          {items}
          {
            this.state.goal.map((pos) => {
              return (
                <rect x={(pos[0] + 0.05) * this.state.size} y={(7 - pos[1] + 0.05) * this.state.size} width={fillsize} height={fillsize}
                  fill="red" fillOpacity="0.5" key={"goal-" + pos[0].toString() + " " + pos[1].toString()}
                  countx={pos[0]} county={pos[1]}
                  onDoubleClick={this.updateGoal.bind(this)} />
              )
            })
          }
          {
            this.state.start.map((pos) => {
              return (
                <rect x={(pos[0] + 0.05) * this.state.size} y={(7 - pos[1] + 0.05) * this.state.size} width={fillsize} height={fillsize}
                  fill="blue" fillOpacity="0.5" key={"start-" + pos[0].toString() + " " + pos[1].toString()}
                  countx={pos[0]} county={pos[1]} />
              )
            })
          }
          {
            this.state.walkmap.map((array, y) => {
              return (
                array.map((num, x) => {
                  return (
                    <text x={(x + 0.5) * this.state.size} y={(7 - y + 0.5) * this.state.size} key={"goal-" + x.toString() + "-" + y.toString()}>
                      {num}
                    </text>
                  );
                })
              )
            })
          }
          {
            this.state.maze.map((array) => {
              x++
              if (x === this.state.mapsize[0]) {
                x = 0;
                y++;
              }
              return <g strokeWidth="6" stroke="black" key={"g-" + x.toString() + " " + y.toString()}>
                {array.map((element, i) => {
                  switch (i) {
                    // Top
                    case 0:
                      return <line x1={(x * this.state.size)} x2={(x * this.state.size + this.state.size)} y1={((8 - y) * this.state.size)} y2={((8 - y) * this.state.size)} stroke={element === 1 ? "black" : "#eee"} onClick={(e) => this.onClick(e)} key={x.toString() + " " + y.toString() + i.toString()} />
                    // Right
                    case 1:
                      return <line x1={((x + 1) * this.state.size)} x2={((x + 1) * this.state.size)} y1={((8 - y) * this.state.size)} y2={((8 - y) * this.state.size + this.state.size)} stroke={element === 1 ? "black" : "#eee"} onClick={(e) => this.onClick(e)} key={x.toString() + " " + y.toString() + i.toString()} />
                    // Bottom
                    case 2:
                      return <line x1={(x * this.state.size)} x2={((x) * this.state.size + this.state.size)} y1={((8 - y + 1) * this.state.size)} y2={((8 - y + 1) * this.state.size)} stroke={element === 1 ? "black" : "#eee"} onClick={(e) => this.onClick(e)} key={x.toString() + " " + y.toString() + i.toString()} />
                    // Left
                    case 3:
                      return <line x1={(x * this.state.size)} x2={(x * this.state.size)} y1={((8 - y) * this.state.size)} y2={((8 - y) * this.state.size + this.state.size)} stroke={element === 1 ? "black" : "#eee"} onClick={(e) => this.onClick(e)} key={x.toString() + " " + y.toString() + i.toString()} />
                    default:
                  }
                })}
              </g>
            })
          }
        </svg>
        <div>
          <button onClick={this.sloveMazeinJs.bind(this)} className="pure-button">{"Slove (JS)"}</button>
          <button className="pure-button" disabled>{"Slove (Rust)"}</button>
          <button onClick={this.outputMaze.bind(this)} className="pure-button">{"Output Maze"}</button>
        </div>
      </div>
    );
  }
}

export default App;
