import React, {useRef} from "react";
import Pagination from './Pagination';


interface SearchBarProps {
  page: number;
  changePage: (target: number) => void;
};

function SearchBar(props: SearchBarProps) {

  return (
    <div className="search-bar">
      <Pagination onChange={props.changePage} current={props.page}/>
    </div>
  );
}

export default SearchBar;
