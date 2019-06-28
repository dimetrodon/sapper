import React from 'react';
import Board from './board.js';

class Game extends React.Component {
  constructor(props){
    super(props);

    const Board = this.makeBoard();

    this.state = {
      history: Board.history,
      stepNumber: 0,
      boardArae: Board.boardArae,
    };
  }

  handleClick( e, row, square ) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const steps = current.steps.slice();
    this.checkStep( row, square, steps );

    this.setState({
      history: history.concat([{
        step: [ row, square ],
        steps: steps,
      }]),
      stepNumber: history.length,
    });
  }

  onClickMine( e, row, square ){
    e.preventDefault();
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const steps = current.steps.slice();

    if ( steps[row][square] === 1 ) {
      return false;
    }

    steps[row][square] = steps[row][square] === 2 ? 0 : 2;

    this.setState({
      history: history.concat([{
        step: [ row, square ],
        steps: steps,
      }]),
      stepNumber: history.length,
    });
  }

  checkStep(row, square, steps) {
    const boardArae = this.state.boardArae;

    switch(true){
      case steps[row][square] === 2:
        return;
      case boardArae[row][square] === 'X':
        steps[row][square] = 3;
        break;
      default:
        steps[row][square] = 1;
    
        if ( boardArae[row][square] === 0 ){
          this.openZeroFields(row, square, steps);
        }
        break;
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
            onClick = { ( e, row, square ) => this.handleClick( e, row, square ) }
            onClickMine = { ( e, row, square ) => this.onClickMine( e, row, square ) }
          />
        </div>
      </div>
    );
  }
  /*
  Create Board
  */

  makeBoard() {
    const width = this.props.width;
    const height = this.props.height;
    const mine = this.props.mine;
    const _row = Array(width).fill(0);

    let square,
        row,
        boardArae = Array(height).fill(null),
        steps = Array(height).fill(null);

    
    boardArae = boardArae.map( function(){
      return _row.slice();
    });

    steps = steps.map( function(){
      return _row.slice();
    });


    for (var i = 0; mine > i; i++) {
      do {
        square = Math.floor( Math.random() * width );
        row = Math.floor( Math.random() * height );
      } while ( boardArae[row][square] === 'X' );

      this.setMine(row, square,boardArae);
    }

    return {
      history: [{
        step: null,
        steps: steps,
      }],
      boardArae: boardArae,
    }
  }

  openZeroFields(row, square, steps) {
    const width = this.props.width;
    const height = this.props.height;
    const boardArae = this.state.boardArae;
    let currentSquare , currentRow;

    currentSquare = square - 1;
    if ( currentSquare  >= 0 ){
      currentRow = row + 1;

      if ( currentRow < height && steps[currentRow][currentSquare] === 0 ){
        steps[currentRow][currentSquare] = 1;

        if ( boardArae[currentRow][currentSquare] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
      } 

      currentRow = row;
      if ( steps[currentRow][currentSquare] === 0 ){

        steps[currentRow][currentSquare] = 1;
        if ( boardArae[currentRow][currentSquare] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
      }
      
      currentRow = row - 1;
      if ( currentRow >= 0 && steps[currentRow][currentSquare] === 0 ){

        steps[currentRow][currentSquare] = 1;
        if ( boardArae[currentRow][currentSquare] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
      }
    }
    
    currentSquare  = square;
    currentRow = row + 1;
    if ( currentRow < height && steps[currentRow][currentSquare] === 0 ){

        steps[currentRow][currentSquare] = 1;
        if ( boardArae[currentRow][currentSquare] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
    }
    
    currentRow = row - 1;
    if ( currentRow >= 0 && steps[currentRow][currentSquare] === 0 ){
        
        steps[currentRow][currentSquare] = 1;
        if ( boardArae[currentRow][currentSquare ] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
    }

    currentSquare  = square + 1;
    if ( currentSquare  < width ) {

      currentRow = row + 1;
      if ( currentRow < height && steps[currentRow][currentSquare] === 0 ){

        steps[currentRow][currentSquare ] = 1;
        if ( boardArae[currentRow][currentSquare] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
      }
      
      currentRow = row;
      if ( steps[currentRow][currentSquare] === 0 ){

        steps[currentRow][currentSquare] = 1;
        if ( boardArae[currentRow][currentSquare] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
      }
      
      currentRow = row - 1;   
      if ( currentRow >= 0 && steps[currentRow][currentSquare] === 0 ){
        
        steps[currentRow][currentSquare] = 1
        if ( boardArae[currentRow][currentSquare ] === 0 ){
          this.openZeroFields(currentRow, currentSquare, steps);
        }
      }
    }
  }

  setMine(row, square, boardArae) {
    const width = this.props.width;
    const height = this.props.height;
    const mine = 'X';

    let currentSquare , currentRow;
    
    boardArae[row][square] = mine;

    currentSquare = square - 1;
    if ( currentSquare  >= 0 ){

      currentRow = row + 1;
      if ( currentRow < height && boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
      } 

      currentRow = row;
      if ( boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
      }
      
      currentRow = row - 1;
      if ( currentRow >= 0 && boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
      }
    }
    
    currentSquare  = square;
    currentRow = row + 1;
    if ( currentRow < height && boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
    }
    
    currentRow = row - 1;
    if ( currentRow >= 0 && boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
    }

    currentSquare  = square + 1;
    if ( currentSquare  < width ) {

      currentRow = row + 1;
      if ( currentRow < height && boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
      }
      
      currentRow = row;
      if ( boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
      }
      
      currentRow = row - 1;   
      if ( currentRow >= 0 && boardArae[currentRow][currentSquare] !== mine ){
        boardArae[currentRow][currentSquare]++;
      }
    }
  }
}

export default Game;