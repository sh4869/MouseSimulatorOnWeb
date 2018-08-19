import React, { Component } from "react";
import solve from "./solver.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 80,
      mapsize: [8, 8],
      maze: [
        [0, 0, 1, 1],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0]
      ],
      solved: false,
      goal: [[7, 7]],
      start: [[0, 0]],
      walkmap: [[]]
    };
  }

  onClick(e) {
    const x1 = parseInt(e.target.getAttribute("x1"), 10);
    const x2 = parseInt(e.target.getAttribute("x2"), 10);
    const y1 = parseInt(e.target.getAttribute("y1"), 10);
    const y2 = parseInt(e.target.getAttribute("y2"), 10);
    if (
      (x1 === x2 &&
        (x1 === this.state.size * this.state.mapsize[0] || x1 === 0)) ||
      (y1 === y2 &&
        (y1 === this.state.size * this.state.mapsize[1] || y1 === 0))
    ) {
      console.log("This is Wall.");
      return;
    }
    // 横か縦かを調べる
    const x = x1 / this.state.size;
    const y = 7 - y1 / this.state.size;
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
    this.setState({ maze: copystate });
  }

  updateGoal(e) {
    const x = parseInt(e.target.getAttribute("countx"), 10);
    const y = parseInt(e.target.getAttribute("county"), 10);
    // スタートだったら早期Return
    if (this.state.start.some(v => v[0] === x && v[1] === y)) return;
    let newgoal = this.state.goal;
    if (this.state.goal.some((v, i, a) => v[0] === x && v[1] === y)) {
      newgoal = this.state.goal.filter((v, i, a) => v[0] !== x || v[1] !== y);
    } else {
      newgoal.push([x, y]);
    }
    this.setState({ goal: newgoal });
  }

  outputMaze(e) {
    let log = "";
    this.state.maze.forEach(array => {
      log += "[" + array.toString() + "],";
    });
    console.log(log);
  }

  solveMazeinJs(e) {
    const wmap = solve(this.state.mapsize, this.state.maze, this.state.goal);
    console.log(wmap);
    this.setState({ walkmap: wmap, solved: !this.state.solved });
  }

  render() {
    let x = -1,
      y = 1;
    const items = [];
    const size = this.state.size;
    const fillsize = size * 0.9;

    for (let y = 0; y < this.state.mapsize[1]; y++) {
      for (let x = 0; x < this.state.mapsize[0]; x++) {
        const isgoal = this.state.goal.some(v => v[0] === x && v[1] === y);
        const isstart = this.state.start.some(v => v[0] === x && v[1] === y);
        items.push(
          <rect
            x={(x + 0.05) * size}
            y={(7 - y + 0.05) * size}
            width={fillsize}
            height={fillsize}
            fill={isstart ? "blue" : isgoal ? "red" : "white"}
            fillOpacity="0.5"
            onDoubleClick={!isstart ? this.updateGoal.bind(this) : null}
            countx={x}
            county={y}
            key={"map-white-" + x.toString() + "-" + y.toString()}
          />
        );
      }
    }
    return (
      <div className="App">
        <p className="App-title">{"Mouse Simulator"}</p>
        <svg
          version="1.1"
          width={size * this.state.mapsize[0] + 10}
          height={size * this.state.mapsize[1] + 10}
          xmlns="http://www.w3.org/2000/svg"
        >
          {items}
          {this.state.solved && this.state.walkmap.map((array, y) => {
            return array.map((num, x) => {
              return (
                <text
                  x={(x + 0.5) * size}
                  y={(7 - y + 0.5) * size}
                  key={"goal-" + x.toString() + "-" + y.toString()}
                >
                  {num}
                </text>
              );
            });
          })}
          {this.state.maze.map(array => {
            x++;
            if (x === this.state.mapsize[0]) {
              x = 0;
              y++;
            }
            return (
              <g
                strokeWidth="6"
                stroke="black"
                key={"g-" + x.toString() + " " + y.toString()}
              >
                <line
                  x1={x * size}
                  x2={x * size + size}
                  y1={(8 - y) * size}
                  y2={(8 - y) * size}
                  stroke={array[0] === 1 ? "black" : "#eee"}
                  onClick={e => this.onClick(e)}
                  key={x.toString() + " " + y.toString() + "up"}
                />
                <line
                  x1={(x + 1) * size}
                  x2={(x + 1) * size}
                  y1={(8 - y) * size}
                  y2={(8 - y) * size + size}
                  stroke={array[1] === 1 ? "black" : "#eee"}
                  onClick={e => this.onClick(e)}
                  key={x.toString() + " " + y.toString() + "right"}
                />
                <line
                  x1={x * size}
                  x2={x * size + size}
                  y1={(8 - y + 1) * size}
                  y2={(8 - y + 1) * size}
                  stroke={array[2] === 1 ? "black" : "#eee"}
                  onClick={e => this.onClick(e)}
                  key={x.toString() + " " + y.toString() + "bottom"}
                />
                <line
                  x1={x * size}
                  x2={x * size}
                  y1={(8 - y) * size}
                  y2={(8 - y) * size + size}
                  stroke={array[3] === 1 ? "black" : "#eee"}
                  onClick={e => this.onClick(e)}
                  key={x.toString() + " " + y.toString() + "left"}
                />
              </g>
            );
          })}
        </svg>
        <div>
          <button
            onClick={this.solveMazeinJs.bind(this)}
            className="pure-button"
          >
            {"Solve (JS)"}
          </button>
          <button className="pure-button" disabled>
            {"Solve (Rust)"}
          </button>
          <button onClick={this.outputMaze.bind(this)} className="pure-button">
            {"Output Maze"}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
