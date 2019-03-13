import React, {useEffect} from "react";
import { Observer } from "mobx-react-lite";
import {nes_load_url, nes_load_data} from 'src/tools/nesEmbed';
import {useAllState} from 'src/mobx/';

interface GameProps {
  match: {
    params: {
      _id: string;
    };
  };
}
interface GamePanelProps {
    data: WanCategoryPushed;
}

function GameHeader(props: GamePanelProps) {
  console.log(props.data);
  const {imgResource, name, categoryName}:WanCategoryPushed = props.data;

  let startGame = () => {};

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
  const [{onlineList}, {listItemById}] = useAllState(['onlineList']);

  useEffect(() => {
    if (onlineList.data.length === 0) {
      listItemById(props.match.params._id);
    }
  }, [onlineList.data[0]]);


  return (<div className="main-game">
    <Observer render={() => {
      const current = onlineList.data.filter(obj => obj._id === props.match.params._id)[0];

      return current ? (<GameHeader data={current} />) : <span>loading...</span>;
    }} />
  </div>);
}

export default Game;
