import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    const Board = this.makeBoard();

    this.state = {
      history: Board.history,
      stepNumber: 0,
      boardArae: Board.boardArae,
    };
  }

  handleClick( y, x ){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const steps = current.steps.slice();
    this.checkStep( x, y, steps );

    this.setState({
      history: history.concat([{
        step: [ x, y ],
        steps: steps,
      }]),
      stepNumber: history.length,
    });
  }

  onClickMine( e, y, x ){
    e.preventDefault();
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const steps = current.steps.slice();

    if ( steps[y][x] === 1 ) {
      return false;
    }

    steps[y][x] = steps[y][x] === 2 ? 0 : 2;

    this.setState({
      history: history.concat([{
        step: [ x, y ],
        steps: steps,
      }]),
      stepNumber: history.length,
    });
  }

  checkStep(x, y, steps) {
    const boardArae = this.state.boardArae;

    if ( steps[y][x] == 2 ) {
      return;
    }

    steps[y][x] = 1;
    
    if ( boardArae[y][x] === 0 ){
      this.openZeroFields(x, y, steps);
    }

  }

  openZeroFields(x, y, steps){
    const width = this.props.width;
    const height = this.props.height;
    const boardArae = this.state.boardArae;
    let currentX, currentY;

    currentX =  x - 1;
    if (  currentX >= 0 ){
      currentY = y + 1;
      if ( currentY < height && steps[currentY][currentX] === 0 ){
        steps[currentY][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
      } 

      currentY = y;
      if ( steps[currentY][currentX] === 0 ){
        steps[y][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
      }
      
      currentY = y - 1;
      if ( currentY >= 0 && steps[currentY][currentX] === 0 ){
        steps[currentY][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
      }
    }
    
    currentX = x;
    currentY = y + 1;
    if ( currentY < height && steps[currentY][currentX] === 0 ){
        steps[currentY][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
    }
    
    currentY = y - 1;
    if ( currentY >= 0 && steps[currentY][currentX] === 0 ){
        steps[currentY][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
    }

    currentX = x + 1;
    if ( currentX < width ) {

      currentY = y + 1;
      if ( currentY < height && steps[currentY][currentX] === 0 ){
        steps[currentY][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
      }
      
      currentY = y
      if ( steps[currentY][currentX] === 0 ){
        steps[currentY][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
      }
      
      currentY = y - 1;   
      if ( currentY >= 0 && steps[currentY][currentX] === 0 ){
        steps[currentY][currentX] = 1

        if ( boardArae[currentY][currentX] === 0 ){
          this.openZeroFields(currentX, currentY, steps)
        }
      }
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardArae = { this.state.boardArae }
            steps = { current.steps }
            onClick = { ( y, x ) => this.handleClick( y, x ) }
            onClickMine = { ( e, x, y ) => this.onClickMine( e, x, y ) }
          />
        </div>
      </div>
    );
  }

  /*
    Create Board
  */
  makeBoard(){
    const width = this.props.width;
    const height = this.props.height;
    const mine = this.props.mine;
    const row = Array(width).fill(0);

    let x,
        y,
        boardArae = Array(height).fill(null),
        steps = Array(height).fill(null);

    
    boardArae = boardArae.map( function(){
      return row.slice();
    });

    steps = steps.map( function(){
      return row.slice();
    });


    for (var i = 0; mine > i; i++) {
      do {
        x = Math.floor( Math.random() * width );
        y = Math.floor( Math.random() * height );
      } while ( boardArae[y][x] === 'X' );

      this.setMine(x,y,boardArae);
    }

    return {
      history: [{
        step: null,
        steps: steps,
      }],
      boardArae: boardArae,
    }
  }

  setMine(x, y, boardArae){
    const width = this.props.width;
    const height = this.props.height;
    const mine = 'X'
    
    boardArae[y][x] = mine;

    if (  x - 1 >= 0 ){
      if ( ( y + 1 ) < height && boardArae[y + 1][x - 1] !== mine ){
        boardArae[y + 1][x - 1]++;
      }

      if ( boardArae[y][x - 1] !== mine ){
        boardArae[y][x - 1]++;
      }
      
      if ( y - 1 >= 0 && boardArae[y - 1][x - 1] !== mine ){
        boardArae[y - 1][x - 1]++;
      }
    }
    

    if ( y + 1 < height && boardArae[y + 1][x] !== mine ){
      boardArae[y + 1][x]++;
    }
    
    if ( y - 1 >= 0 && boardArae[y - 1][x] !== mine ){
      boardArae[y - 1][x]++;
    }

    if ( x + 1 < width ) {
      if ( y + 1 < height && boardArae[y + 1][x + 1] !== mine ){
        boardArae[y + 1][x + 1]++;
      }

      if ( boardArae[y][x + 1] !== mine ){
        boardArae[y][x + 1]++;
      }
      
      if ( y - 1 >= 0 && boardArae[y - 1][x + 1] !== mine ){
        boardArae[y - 1][x + 1]++;
      }
    }
  }
}

// ========================================

ReactDOM.render(
  <Game 
    width = {13}
    height = {10}
    mine = {9}
  />,
  document.getElementById('root')
);