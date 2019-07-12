import React from 'react';

import { ChessPanel } from './ChessPanel';
import { Degree ,ChessType, GameStatus} from '../types/enum';

import './GameComp.css'

// 状态 
interface IState {
    chesses:ChessType[],
    gameStatus:GameStatus,
    nextChess:ChessType.red | ChessType.black,   //下一刻落子方
    degree:Degree
}

export class GameComp extends React.Component <{},IState> {

    state:IState = {
        chesses:[],
        gameStatus:GameStatus.notStart,
        nextChess:ChessType.black,
        degree:Degree.lighter
    }

    componentDidMount(){
        this.init(9)
    }
    
    /**
     * 初始化数组
     */
    init(length:number):void{
        const arr:ChessType[] = []
        for(let i = 0;i<length;i++){
            arr.push(ChessType.none)
        }

        // 随机设置优先落子：
        const num = Math.round(Math.random());
        const  type:ChessType = num === 1? ChessType.red : ChessType.black

        this.setState({
            chesses:arr,
            gameStatus:GameStatus.notStart,
            nextChess:type
        })
        
    }

    /**
     * 处理棋子的点击事件
     * 该函数运行，说明：
     * 1.游戏未结束
     * 2.点击位置没有棋子
     * @param index 
     */
    handleChessClick(index:number){
        const chesses:ChessType[] = [...this.state.chesses]
        chesses[index] = this.state.nextChess

        this.setState(prevState => ({
            chesses,
            nextChess:prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red,
            gameStatus:this.handleStatus(chesses,index)
        }))
    }

    /**
     * 判断结果
     * 1. 判断是否成功 （判断成功是谁？）
     * 2. 判断是否平局 
     * 3. 比赛进行中 。。。
     */
    handleStatus(chesses:ChessType[],index:number) :GameStatus{
        const subsetNum = Math.sqrt(chesses.length)
    
        if(
            this.handleTransverseChess(chesses,index,subsetNum)  // 横向
        ||  this.handleLongitudinal(chesses,index,subsetNum)
        ||  this.handleSlash(chesses,index,subsetNum)
            ){
            return this.state.nextChess === ChessType.red ? GameStatus.redWin : GameStatus.blackWin
        }else{
            return chesses.includes(ChessType.none) ?  GameStatus.gaming : GameStatus.equal
        }
    }

    /**
     * 判断横向成线
     * @param chesses 
     * @param index 
     * @param subsetNum 
     */
    handleTransverseChess(chesses:ChessType[],index:number,subsetNum:number){
        const minIndex = Math.floor(index / subsetNum) * subsetNum
        const minChess = chesses[minIndex]
        for(let i = 1;i< subsetNum;i++){
            let idx = minIndex + i
            if(chesses[idx] !== minChess){
                return false
            }
        }
        return true
    }

    /**
     * 判断纵向成线
     * @param chesses 
     * @param index 
     * @param subsetNum 
     */
    handleLongitudinal(chesses:ChessType[],index:number,subsetNum:number){
        const minIndex = Math.floor(index % subsetNum)
        const minChess = chesses[minIndex]

        for(let i = 1;i< subsetNum;i++){
            let idx = i * subsetNum + minIndex 
            if(chesses[idx] !== minChess){
                return false
            }
        }
        return true
    }

    /**
     * 判断斜线成线
     * @param chesses 
     * @param index 
     * @param subsetNum 
     */
    handleSlash(chesses:ChessType[],index:number,subsetNum:number){
        //判断是否是棋盘中心点
        const remainder = Math.floor(subsetNum / 2)
        let centerIndex = (subsetNum + 1) * remainder

        if(centerIndex === index){  // 棋盘正中心
            return this.handleMatching(chesses,subsetNum,0) || this.handleMatching(chesses,subsetNum,subsetNum-1)
        }
        else if (index % (subsetNum + 1) === 0){  // 以0开头的斜线
           return this.handleMatching(chesses,subsetNum,0)
        }
        else if (index % (subsetNum -1) === 0){   // 以(n-1)开头的斜线
            return this.handleMatching(chesses,subsetNum,subsetNum-1)
        }
    }

    handleMatching(chesses:ChessType[],subsetNum:number,startIndex:number){
        let startChess = chesses[startIndex]
        for(let i = 1;i<subsetNum;i++){
            let chessIndex = startIndex === 0 ? (i * (subsetNum + 1) ) : ( (i+1) * (subsetNum-1))
            if(startChess !== chesses[chessIndex]){
                return false
            }
        }

        return true
    }

    /**
     * click 选择 等级
     * @param degree 难度
     */
    changeDegree(degree:Degree){
        if(this.state.gameStatus !==  GameStatus.gaming || window.confirm('比赛进行中，确定切换？')){
            this.setState({
                degree
            })

            this.init(degree)
        }
    }

    render(){
        return  (
            <div className="panel">
                <form>
                    <label>等级：</label>
                    <p>
                        <input type="radio"  
                            checked={ this.state.degree === Degree.lighter} 
                            onChange={
                                ()=>{
                                    this.changeDegree(Degree.lighter) 
                                }
                            }/> 
                        <span>简单</span>
                    </p>
                    
                    <p>
                        <input type="radio" 
                            checked={ this.state.degree === Degree.middle}
                            onChange={
                            ()=>{
                               this.changeDegree(Degree.middle) 
                            }
                        }/> 
                        <span>中等</span>
                    </p>

                    <p>
                        <input type="radio" 
                            checked={ this.state.degree === Degree.higher}
                            onChange={
                                ()=>{
                                this.changeDegree(Degree.higher) 
                                }
                            }/> 
                        <span>困难</span>
                    </p>
                </form>
                
                {
                    
                    /**
                     * className 动态配置
                     *  // <p className= {['tipTitle' ,(this.state.nextChess === ChessType.red ? 'colorRed':'colorBlack')].join(',') }>
                        // {this.state.nextChess === ChessType.red? '红子':'黑子'}请落子</p>

                        // <p className= { `tipTitle ${this.state.nextChess === ChessType.red ? 'colorRed':'colorBlack'}`}>
                        // {this.state.nextChess === ChessType.red? '红子':'黑子'}请落子</p>
                     */

                    this.state.gameStatus === GameStatus.notStart ? (
                        <p className="startBtn" onClick={()=>{
                            this.setState({
                                gameStatus:GameStatus.gaming
                            })
                         }}>开始</p>
                    ) : (
                        <blockquote>
                           { 
                               this.state.gameStatus !== GameStatus.gaming ? (
                               <p className="startBtn" onClick={()=>{
                                this.changeDegree(this.state.degree)
                                this.setState({
                                    gameStatus:GameStatus.gaming
                                })
                                }}>重新开始</p>):(<p></p>)
                            }

                            <p className= { `tipTitle ${this.state.nextChess === ChessType.black ? 'colorBlack':'colorRed'}`}>
                            {
                                (this.state.gameStatus === GameStatus.gaming ) ? (
                                    `${this.state.nextChess === ChessType.red? '红子':'黑子'} 请落子`
                                ):(
                                    this.state.gameStatus === GameStatus.blackWin ? '黑方胜':
                                    ( this.state.gameStatus === GameStatus.redWin ? '红方胜':'平局')
                                )
                            }  
                            </p>
                        </blockquote>
                   )
                }
                

            
                < ChessPanel  degree={this.state.chesses} 
                    isGameOver = {this.state.gameStatus !== GameStatus.gaming}
                    onClick = {i=>{
                        this.handleChessClick(i)
                    }}/>
            </div>
        )
    }
}




