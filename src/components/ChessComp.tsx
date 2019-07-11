import React from 'react';
import { ChessType } from '../types/enum';
import './ChessComp.css';

interface Iprops {
    type:ChessType,
    onClick?:()=>void
}


export function ChessComp (props:Iprops){ 
  
    return (
        <div className="chessComp">
            <div className={`${'chessbox'} ${'chess' + ChessType[props.type] }`} onClick={()=>{
                if(props.type === ChessType.none && props.onClick){
                    props.onClick()
                }
            }}></div>
        </div>
    )
}