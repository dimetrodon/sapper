import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game/game.js';
import './index.css';

// ========================================

ReactDOM.render(
  <Game 
    width = { 13 }
    height = { 10 }
    mine = { 10 }
  />,
  document.getElementById('root')
);