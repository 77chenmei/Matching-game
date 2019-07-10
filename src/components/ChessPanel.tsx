import React from 'react';
import './ChessPanel.css';

import {ChessComp} from './ChessComp'
import { ChessType } from '../types/enum';

interface Iprops {
  degree:ChessType[]
}


export function ChessPanel (props:Iprops){

  return (
     <div className="App">
      {
        props.degree.map(item => {
          <ChessComp type={item}/>
        })
      }
    </div>
  )
} 
