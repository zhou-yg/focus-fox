import React, {useEffect, useState} from "react";


interface GameHeaderProps {
    data: WanCategoryPushed;
    onGameStart: () => void;
}


function GameHeader(props: GameHeaderProps) {
  console.log(props.data);
  const {imgResource, name, categoryName}:WanCategoryPushed = props.data;
  let startGame = () => {
    props.onGameStart();
  };

  return (
    <div className="main-game-header">
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
          <button onClick={startGame}>开始游戏</button>
        </li>
      </ul>
    </div>
  );
}

export default GameHeader;
