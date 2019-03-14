import { useObservable } from "mobx-react-lite";
import moment from 'moment';
import React, {useEffect, useState} from "react";
import { Observer } from "mobx-react-lite";
import {nes_load_url, nes_load_data} from 'src/tools/nesEmbed';
import {useAllState} from 'src/mobx/';
import { observable } from "mobx";

interface GameProps {
  match: {
    params: {
      _id: string;
    };
  };
}
interface GameHeaderProps {
    data: WanCategoryPushed;
    onGameStart: () => void;
}
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

function GameHeader(props: GameHeaderProps) {
  console.log(props.data);
  const {imgResource, name, categoryName}:WanCategoryPushed = props.data;
  let startGame = () => {
    props.onGameStart();
  };

  return (
    <div className="main-game-header">
      <div className="img-box">
        <img width="100%" src={imgResource} />
      </div>
      <ul className="intro">
        <li className="row">
          <span className="pre">名字：</span>
          {name}
        </li>
        <li className="row">
          <span className="pre">类型：</span>
          {categoryName}
        </li>
        <li className="row">
          <button onClick={startGame}>开始游戏</button>
        </li>
      </ul>
    </div>
  );
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
