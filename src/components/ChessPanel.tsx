import React from 'react';
import styled from 'styled-components';

import {ChessComp} from './ChessComp'
import { ChessType } from '../types/enum';

interface Iprops {
  degree:ChessType[],
  isGameOver?:boolean,   //游戏是否结束
  onClick?:(index:number)=>void
}

interface ILength {
  length:number
}

const ChessClass = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width:${(props:ILength)=> (46 * Math.sqrt(props.length) + 'px')}
`

export const ChessPanel:React.FC<Iprops> = function ({degree,isGameOver,onClick}){
  const isOver = isGameOver as boolean ; //类型断言
  // const isGameOver = props.isGameOver! ; //非空断言：在数据上加上！，表示不要考虑该数据为空的情况

  return (
     <ChessClass length={degree.length}>
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
    </ChessClass>
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
