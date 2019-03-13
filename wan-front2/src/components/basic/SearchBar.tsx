import React, {useRef} from "react";
import Pagination from './Pagination';

interface CategoryTypeOption {
    value: CategoryType;
    name: string;
}

const categoryNames = [
  '动作',
  '角色扮演',
  '射击',
  '运动',
  '益智',
  '策略',
  '冒险',
  '竞速',
  '棋牌',
  '桌面',
  '战略模拟',
  '格斗',
  '合集',
  '其它',
];
const indexArr:Array<CategoryType> = new Array(14).fill(0).map((_, i) => i+1 as CategoryType);

const typeSelects:Array<CategoryTypeOption> = indexArr.map((i, ii) => {
  return {
    value: i,
    name: categoryNames[ii],
  };
});

interface SearchBarProps {
  select:CategoryType;
  pushed?:Boolean;
  changeSelect: (value:CategoryType) => void;
  page: number;
  changePage: (target: number) => void;
};

function SearchBar(props: SearchBarProps) {
  let select = useRef<HTMLSelectElement>(null);

  let changeSelect = () => {
    if (select.current) {
      props.changeSelect(parseInt(select.current.value) as CategoryType);
    }
  };

  return (
    <div className="search-bar">
      类型：
      <select ref={select} className="select" value={props.select} onChange={changeSelect}>
        {typeSelects.map(obj => {
          return (
            <option key={obj.name} value={obj.value}>{obj.name}</option>
          );
        })}
      </select>
      &nbsp;
      &nbsp;
      &nbsp;
      状态过滤：
      <input type="checkbox" defaultChecked={true} />
      已上架
      &nbsp;
      <Pagination onChange={props.changePage} current={props.page}/>
    </div>
  );
}

export default SearchBar;
