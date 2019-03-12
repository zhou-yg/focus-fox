import React, {useEffect} from "react";
import {nes_load_url, nes_load_data} from 'src/tools/nesEmbed';
import {useAllState} from 'src/mobx/';

interface GameProps {
  match: {
    params: {
      _id: string;
    };
  };
}

function Game(props:GameProps) {
  const [{onlineList}, {listItemById}] = useAllState(['onlineList']);

  useEffect(() => {
    if (onlineList.data.length === 0) {
      listItemById(props.match.params._id);
    }
  });

//  const current = onlineList.data.filter(obj => obj._id === props.match.params._id)[0];

  return (<div className="main-game">

  </div>);
}

export default Game;
