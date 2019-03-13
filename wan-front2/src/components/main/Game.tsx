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

function GamePanel(props: GamePanelProps) {
  console.log(props.data);
  return (<div>{JSON.stringify(props.data)}</div>)
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

      return (
        <GamePanel data={current} />
      );
    }} />
  </div>);
}

export default Game;
