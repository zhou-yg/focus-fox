import React, {useEffect} from "react";
import { Observer } from "mobx-react-lite";
import SearchBar2 from 'src/components/basic/SearchBar2';
import {useAllState} from 'src/mobx/';
import { Link } from "react-router-dom";

function Repo(props:any) {

  // const onlineList = useObservable<WanCategoryPageRes2>({ data: [], all: 0, page: 1 });
  const [{onlineList}, {getOnlineList}] = useAllState();

  useEffect(() => {
    onlineList.selectType = props.match.params.type;
    getOnlineList(onlineList.page, onlineList.selectType);
  });

  return (<div className="main-category main-repo">
    <Observer render={() => {
      return (
        <SearchBar2
          all={onlineList.all}
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
              <Link to={`/wan/game/${item._id}`}>
                {item.exists ? '' : (
                  <div className="game-notfound">
                    无
                  </div>
                )}
                <div className="img-box">
                  <img src={item.imgResource} />
                </div>
                <div className="row">
                  <span className="pre">名字：</span>
                  <span className="value">{item.name}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>;
    }} />
  </div>);
}

export default Repo;
