import React, {useEffect, useState} from "react";


interface NesHeaderProps {
    data: WanCategoryPushed;
    onNesStart: () => void;
}


function NesHeader(props: NesHeaderProps) {
  console.log(props.data);
  const {imgResource, name, categoryName}:WanCategoryPushed = props.data;
  let startNes = () => {
    props.onNesStart();
  };

  return (
    <div className="main-nes-header">
      <div className="img-box">
        {/*
          <img width="100%" src={imgResource} />
          */}
      </div>
      <ul className="intro">
        <li className="row">
          <span className="pre">名字：</span>
          {name}
        </li>
        <li className="row">
          <span className="pre">类型：</span>
          {categoryName}
        </li>
        <li className="row">
          <button onClick={startNes}>开始游戏</button>
        </li>
      </ul>
    </div>
  );
}

export default NesHeader;
