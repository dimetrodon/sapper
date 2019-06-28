import React from 'react';
import ReactDOM from 'react-dom';
class Board extends React.Component {

  renderRow(){
    return this.props.boardArae.map( (rows, row) => {
      return (
        <div
          key={ row }
          className="board-row"
        >
          { this.renderSquares( rows, row ) }
        </div>
      );
    });
  }

  setClass(){
    return 'square';
  }

  getValue( row, square, value ){
    return ( this.props.steps[row][square] ? ( this.props.steps[row][square] === 2 ? '*': ( value ? value : '' ) ) : '' );
  }

  renderSquares( rows, row ) {
    return rows.map( ( value, square ) => {
      return (
        <button
        key={ '' + row +  square}
          className= { this.setClass() }
          onClick={ () => this.props.onClick( row, square ) }
          onContextMenu={ (e) => this.props.onClickMine( e, row, square) }
        >
          { this.getValue( row, square, value ) }
        </button>
      );
    } );
  }

  render() {
    return (
      <div className="board-area">
        { this.renderRow() }
      </div>
    );
  }
}

export default Board;