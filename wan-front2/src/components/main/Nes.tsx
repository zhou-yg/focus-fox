import React, {useEffect, useState} from "react";
import { Observer } from "mobx-react-lite";
import {nes_load_url, nes_load_data} from 'src/tools/nesEmbed';
import {useAllState} from 'src/mobx/';
import NesHeader from './game/NesHeader';
import NesHistory from './game/NesHistory';

interface NesProps {
  match: {
    params: {
      _id: string;
    };
  };
}
function Nes(props:NesProps) {
  const [{onlineList, gameHistory}, {listItemById, getNesHistoryById}] = useAllState();
  const [selectedDiskId, setDisk] = useState('');
  const curId = props.match.params._id;

  useEffect(() => {
    if (onlineList.data.length === 0) {
      listItemById(curId);
    }
    if (gameHistory.id !== curId) {
      getNesHistoryById(curId);
    }
  }, [curId]);

  let startNes = () => {
    console.log(`selectedDiskId:${selectedDiskId}`);
  };
  let selectHistoryItem = (id:string) => {
    console.log(`selectHistoryItem id:`, id)
    setDisk(id);
  };

  return (<div className="main-nes">
    <Observer render={() => {
      const current = onlineList.data.filter(obj => obj._id === props.match.params._id)[0];

      return current ? (<NesHeader data={current} onNesStart={startNes} />) : <span>loading...</span>;
    }} />

    <Observer render={() => {
      return <NesHistory
        selectedId={selectedDiskId}
        list={gameHistory.list}
        onSelect={selectHistoryItem}
      />
    }} />

  </div>);
}

export default Nes;
