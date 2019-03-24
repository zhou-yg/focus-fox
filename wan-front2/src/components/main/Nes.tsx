import React, {useEffect, useState} from "react";
import { Observer } from "mobx-react-lite";
import {useAllState} from 'src/mobx/';
import NesHeader from './nes/NesHeader';
import NesCenter from './nes/NesCenter';

interface NesProps {
  match: {
    params: {
      _id: string;
    };
  };
}
function Nes(props:NesProps) {
  const [{onlineList}, {listItemById}] = useAllState();
  const [isShowNesCenter, setNesCenter] = useState(true);
  const curId = props.match.params._id;

  useEffect(() => {
    if (onlineList.data.length === 0) {
      listItemById(curId);
    }
  }, [curId]);

  let startNes = () => {
    setNesCenter(true);
  };

  return (<div className="main-nes">
      {
        isShowNesCenter ? '' : (
          <div className="main-nes-header-top">
            <Observer render={() => {
                    const current = onlineList.data.filter(obj => obj._id === props.match.params._id)[0];

                    return current ? (<NesHeader data={current} onNesStart={startNes} />) : <span></span>;
                  }} />
          </div>
        )
      }


    <Observer render={() => {
      return (isShowNesCenter ? (<NesCenter
        nesId={curId}
        />) : <span>wait starting</span>);
    }} />

  </div>);
}

export default Nes;
