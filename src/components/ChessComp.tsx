import React from 'react';
import styled from 'styled-components';

import { ChessType } from '../types/enum';

const Chessclass = styled.div`
    width: 40px;
    height: 40px;
    border:2px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:5px;
`

interface Ibackground {
    status:ChessType
}

const Chessbox =  styled.div`
    width:30px;
    height:30px;
    border-radius: 15px;
    background:${(props:Ibackground) => {
        switch(props.status){
            case ChessType.red:
                    return 'radial-gradient(#fff,red)';
            case ChessType.black:
                    return 'radial-gradient(#fff,#000)';
            default:
                    return 'transparent'; 
        }
    }};
`

interface Iprops {
    type:ChessType,
    onClick?:()=>void
}

export function ChessComp (props:Iprops){ 
  
    return (
        <Chessclass>
            <Chessbox status = { props.type } onClick={()=>{
                if(props.type === ChessType.none && props.onClick){
                    props.onClick()
                }
            }}>
            </Chessbox>
        </Chessclass>
    )
}


