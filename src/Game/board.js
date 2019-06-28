import React from 'react';

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

  renderSquares( rows, row ) {
    return rows.map( ( value, square ) => {
      return (
        <button
          key={ '' + row +  square }
          className= { this.getSquaresClass( row, square ) }
          onClick={ (e) => this.props.onClick( e, row, square ) }
          onContextMenu={ (e) => this.props.onClickMine( e, row, square ) }
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

  getSquaresClass( row, square ){
    let classes = '';

    switch(true){
      case ( this.props.steps[row][square] === 3 ):
        classes += ' red';
        break;
      case ( this.props.steps[row][square] === 1 ):
        classes += ' zero';
        break;
      default:
        break;
    }

    
    return 'square' + classes;
  }

  getValue( row, square, value ){
    return ( this.props.steps[row][square] ? ( this.props.steps[row][square] === 2 || this.props.steps[row][square] === 3 ? '*': ( value ? value : '' ) ) : '' );
  }
}

export default Board;