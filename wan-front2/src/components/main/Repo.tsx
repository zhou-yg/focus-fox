import React, {useEffect} from "react";
import { Observer } from "mobx-react-lite";
import SearchBar from 'src/components/basic/SearchBar';
import {useAllState} from 'src/mobx/';

function Repo() {

  // const repoList = useObservable<WanCategoryPageRes2>({ data: [], all: 0, page: 1 });
  const [{repoList}, {getList, pushNes}] = useAllState(['repoList']);

  useEffect(() => {
    getList(repoList.page, repoList.selectType);
    console.log('effect');
  });

  let add = async (item: WanCategoryAdd) => {
    item.onPushing = 1;
    let r = await pushNes(item);
    item.onPushing = r;
  };

  return (<div className="main-repo">
    <Observer render={() => {
      return (
        <SearchBar
          select={repoList.selectType}
          changeSelect={v => getList(repoList.page, v)}
          page={repoList.page}
          changePage={p => getList(p, repoList.selectType)} />
      );
    }}/ >
    <Observer render={() => {
      return <ul>
        {repoList.data.map((item, index) => {
          let canPushed = /\.nes/.test(item.downBase);
          return (
            <li className="repo-li" key={`${item.name}-${index}`}>
              <div className="img-box">
                <img src={item.img} />
              </div>
              <div className="row">
                <span className="pre">名字：</span>
                <span className="value">{item.name}</span>
              </div>
              <div className="row">
                <span className="pre">资源：</span>
                <span className="value">{item.downBase}</span>
              </div>
              <div className="row">
                <span className="fr">
                  {item.onPushing === 3 ? '已上传' :
                  item.onPushing === 1 ? '上传中...' :
                  canPushed ? <button onClick={() => add(item)}>上架</button> : '不可上架'}
                </span>
              </div>
            </li>
          );
        })}
      </ul>;
    }} />
  </div>);
}

export default Repo;
