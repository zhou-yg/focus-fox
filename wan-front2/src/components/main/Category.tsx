import React, {useEffect} from "react";
import { Observer } from "mobx-react-lite";
import Pagination from 'src/components/basic/Pagination';
import SearchBar2 from 'src/components/basic/SearchBar2';
import {useAllState} from 'src/mobx/';
import {WanCategoryAdd} from 'src/tools/http';

function Repo() {

  // const onlineList = useObservable<WanCategoryPageRes2>({ data: [], all: 0, page: 1 });
  const [{onlineList}, {getOnlineList}] = useAllState(['onlineList']);

  useEffect(() => {
    getOnlineList(onlineList.page, onlineList.selectType);
    console.log('effect');
  });

  return (<div className="main-repo">
    <Observer render={() => {
      return (
        <SearchBar2
          page={onlineList.page}
          changePage={p => getOnlineList(p, onlineList.selectType)} />
      );
    }}/ >
    <Observer render={() => {
      return <ul>
        {onlineList.data.map((item, index) => {
          let canPushed = /\.nes/.test(item.downBase);
          return (
            <li className="repo-li" key={`${item.name}-${index}`}>
              <div className="img-box">
                <img src={item.imgResource} />
              </div>
              <div className="row">
                <span className="pre">名字：</span>
                <span className="value">{item.name}</span>
              </div>
            </li>
          );
        })}
      </ul>;
    }} />
  </div>);
}

export default Repo;
