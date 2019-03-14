import React, {useEffect, useState} from "react";
import moment from 'moment';

interface GameHistoryProps {
  selectedId: string;
  list: Array<GameHistoryItem>;
  onSelect: (id:string) => void;
}

function GameHistory(props: GameHistoryProps) {

  return (
    <div className="main-game-history">
      <ul>
        <li className="history-row">
          <div className="s">
            <input type="checkbox" checked={!props.selectedId} onChange={() => props.onSelect(props.selectedId ? '' : '')}/>
          </div>
          <div className="t">新游戏</div>
          <div className="d">（默认）</div>
        </li>
        {props.list.map(obj => {
          let k = `${obj.type}${obj.time}`;
          let tText = obj.type === 0 ? '自动存档' : '主动存档';
          let dText = moment(obj.time).format('YY/MM/DD HH:mm:ss');
          return (
            <li key={k} className="history-row" >
              <div className="s">
                <input type="checkbox"
                  onChange={() => props.onSelect(props.selectedId ? '' : obj._id)}
                  checked={props.selectedId === obj._id} />
              </div>
              <div className="t">{tText}</div>
              <div className="d">{dText}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GameHistory;
