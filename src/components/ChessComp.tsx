import React from 'react';
import { ChessType } from '../types/enum';
import './ChessComp.css';

interface Iprops {
    type:ChessType
}

export function ChessComp (props:Iprops){ 
    return (
        <div className="chessComp">
            <div className={`${'chessbox'} ${'chess' + ChessType[props.type] }`} ></div>
        </div>
    )
}