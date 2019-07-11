import React from 'react';
import './ChessPanel.css';

import {ChessComp} from './ChessComp'
import { ChessType } from '../types/enum';

interface Iprops {
  degree:ChessType[],
  isGameOver?:boolean,   //游戏是否结束
  onClick?:(index:number)=>void
}


export const ChessPanel:React.FC<Iprops> = function ({degree,isGameOver,onClick}){
  const isOver = isGameOver as boolean ; //类型断言
  // const isGameOver = props.isGameOver! ; //非空断言：在数据上加上！，表示不要考虑该数据为空的情况

  const width = 46 * Math.sqrt(degree.length)

  return (
     <div className="chessPanel" style={{width:`${width}px`}}>
      {
        degree.map((item,idx) => <ChessComp 
          type={item}  
          key={idx} 
          onClick={()=>{
            if(onClick && !isOver){
              onClick(idx)
            }
          }}/> )
      }
    </div>
  )
} 


ChessPanel.defaultProps = {
  isGameOver:false
}

// 约束属性中，值设置为可选
// export const ChessPanel:React.FC<Iprops> (Iprops是对props 约束) = function (props)
// 设置defaultProps

// export const ChessPanel = function（）{}
// 或者 const ChessPanel =  function(){}   export {ChessPanel}
