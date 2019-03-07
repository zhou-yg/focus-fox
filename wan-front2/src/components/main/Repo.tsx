import React, {useEffect} from "react";
import { Observer } from "mobx-react-lite";
import Pagination from 'src/components/basic/Pagination';
import {useAllState} from 'src/mobx/';

function Repo() {

  // const repoList = useObservable<WanCategoryPageRes2>({ data: [], all: 0, page: 1 });
  const [{repoList}, {getList}] = useAllState(['repoList']);


  useEffect(() => {
    getList(repoList.page);
    console.log('effect');
  });
  return (<div className="main-repo">
  
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
        <Pagination current={repoList.page} onChange={getList}/>
      );
    }} />
  </div>);
}

export default Repo;
