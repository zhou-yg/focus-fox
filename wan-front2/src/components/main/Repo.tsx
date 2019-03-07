import React, {useEffect} from "react";
import http, {WanCategoryPageRes} from 'src/tools/http';
import { Observer, useObservable } from "mobx-react-lite";
import Pagination from 'src/components/basic/Pagination';

interface WanCategoryPageRes2 extends WanCategoryPageRes {
    page: number;
}

function Repo() {
  const repoList = useObservable<WanCategoryPageRes2>({ data: [], all: 0, page: 1 });

  let getList = (page: number):any => {
    repoList.page = page;
    return http.api.wan.category.listRepo.get({
      type: 1,
      page,
      pageSize: 15,
    }).then(({all, data}) => {
      repoList.all = all;
      repoList.data = data;
    });
  }

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
