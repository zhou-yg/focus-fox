import React, {useEffect, useState} from "react";

function NesKeymap() {
  return (
    <div className="main-nes-keymap">
      <div className="direction">
        <div className="up">w</div>
        <div className="down">s</div>
        <div className="left">a</div>
        <div className="right">d</div>
      </div>
      <div className="op">
        <div className="select">v</div>
        <div className="start">b</div>
      </div>
      <div className="ab">
        <div className="b">
          j
        </div>
        <div className="a">
          k
        </div>
      </div>
    </div>
  );
}

export default NesKeymap;
