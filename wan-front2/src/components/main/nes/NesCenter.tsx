import React, {useEffect, useState, useRef} from "react";
import { Observer } from "mobx-react-lite";
import NesHistory from './NesHistory';
import NesKeymap from './NesKeymap';
import {useAllState} from 'src/mobx/';
import moment from 'moment';
import NesGame from './NesGame';

interface NesCenterProps {
  nesId:string;
}

function NesCenter(props: NesCenterProps) {
  const [{gameHistory}, {getNesHistoryById}] = useAllState();
  const [selectedDiskId, setDisk] = useState('');
  const [isGameStart, setGameStatus] = useState(false);

  const nesId = props.nesId;

  useEffect(() => {
    if (gameHistory.id !== nesId) {
      getNesHistoryById(nesId);
    }
  }, [nesId]);

  let selectHistoryItem = (id:string) => {
    console.log(`selectHistoryItem id:`, id)
    setDisk(id);
  };

  let gameStart = () => {
    setGameStatus(true);
  }

  let selectGame:NesHistoryItem = gameHistory.list.filter(obj => obj._id === selectedDiskId)[0];
  let selectTypeText:string = selectGame && selectGame.type === 0 ? '主动存档' : '自动存档';
  let selectTime:string = selectGame ? moment(selectGame.time).format('YYYY-MM-DD HH:mm:ss') : '';



  return (<div className="main-nes-center">



  {isGameStart ? (
    <div className="main-nes-start">
      <NesGame nesId={nesId} historyId={selectedDiskId} />
    </div>
  ) : (<div className="main-nes-history-top">

    <header className="main-nes-history-top-header">
      {selectGame ? `已选择 ${selectTypeText} ${selectTime}` : '新游戏'}
      <button onClick={gameStart}>开始游戏</button>
    </header>

    <Observer render={() => {
      return (
        <div>
          <NesHistory
            selectedId={selectedDiskId}
            list={gameHistory.list}
            onSelect={selectHistoryItem}
          />
          <br/>
          <NesKeymap />
        </div>
      )
    }} />
  </div>)
  }

  </div>);
}

export default NesCenter;
