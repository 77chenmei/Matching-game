import React from 'react';
import ReactDOM from 'react-dom';
import { ChessPanel } from './components/ChessPanel';
import { degree ,ChessType} from './types/enum';

import './index.css'

const degreeArr = [
    ChessType.none,
    ChessType.none,
    ChessType.none,
    ChessType.none,
    ChessType.none,
    ChessType.none,
    ChessType.none,
    ChessType.none,
    ChessType.none
]



const Panel = () =>{
    return  (
        <div className="panel">
            <form>
                <label>等级：</label>
                <p>
                    <input type="radio" value={degree.lighter}/> 
                    <span>简单</span>
                </p>
                
                <p>
                    <input type="radio" value={degree.middle}/> 
                    <span>中等</span>
                </p>

                <p>
                    <input type="radio" value={degree.higher}/> 
                    <span>困难</span>
                </p>
            </form>
            
            <p className="colorRed">红方请落子</p>

            < ChessPanel  degree={degreeArr} />
        </div>
    )
}

ReactDOM.render(< Panel />, document.getElementById('root'));

