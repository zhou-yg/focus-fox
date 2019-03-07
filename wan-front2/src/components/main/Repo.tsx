import React, {useEffect} from "react";
import { Observer } from "mobx-react-lite";
import Pagination from 'src/components/basic/Pagination';
import SearchBar from 'src/components/basic/SearchBar';
import {useAllState} from 'src/mobx/';

function Repo() {

  // const repoList = useObservable<WanCategoryPageRes2>({ data: [], all: 0, page: 1 });
  const [{repoList}, {getList}] = useAllState(['repoList']);

  useEffect(() => {
    getList(repoList.page, repoList.selectType);
    console.log('effect');
  });

  return (<div className="main-repo">
    <Observer render={() => {
      return (
        <SearchBar select={repoList.selectType} changeSelect={v => getList(repoList.page, v)}/>
      );
    }}/ >
    <Observer render={() => {
      return <ul>
        {repoList.data.map((item, index) => {
          return (
            <li className="repo-li" key={`${item.name}-${index}`}>
              <div className="img-box">
                <img src={item.img} />
              </div>
              <div className="name-box">{item.name}</div>
            </li>
          );
        })}
      </ul>;
    }} />
    <Observer render={() => {
      return (
        <Pagination current={repoList.page} onChange={p => getList(p, repoList.selectType)}/>
      );
    }} />
  </div>);
}

export default Repo;
