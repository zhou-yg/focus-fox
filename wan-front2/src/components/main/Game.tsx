import React, {useEffect, useState} from "react";
import { Observer } from "mobx-react-lite";
import {nes_load_url, nes_load_data} from 'src/tools/nesEmbed';
import {useAllState} from 'src/mobx/';
import GameHeader from './game/GameHeader';
import GameHistory from './game/GameHistory';

interface GameProps {
  match: {
    params: {
      _id: string;
    };
  };
}
function Game(props:GameProps) {
  const [{onlineList, gameHistory}, {listItemById, getGameHistoryById}] = useAllState();
  const [selectedDiskId, setDisk] = useState('');
  const curId = props.match.params._id;

  useEffect(() => {
    if (onlineList.data.length === 0) {
      listItemById(curId);
    }
    if (gameHistory.id !== curId) {
      getGameHistoryById(curId);
    }
  }, [curId]);

  let startGame = () => {
    console.log(`selectedDiskId:${selectedDiskId}`);
  };
  let selectHistoryItem = (id:string) => {
    console.log(`selectHistoryItem id:`, id)
    setDisk(id);
  };

  return (<div className="main-game">
    <Observer render={() => {
      const current = onlineList.data.filter(obj => obj._id === props.match.params._id)[0];

      return current ? (<GameHeader data={current} onGameStart={startGame} />) : <span>loading...</span>;
    }} />

    <Observer render={() => {
      return <GameHistory
        selectedId={selectedDiskId}
        list={gameHistory.list}
        onSelect={selectHistoryItem}
      />
    }} />

  </div>);
}

export default Game;
