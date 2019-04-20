import React, {useEffect, useState} from "react";
import InputText from 'src/components/basic/InputText';
import {useAllState} from 'src/mobx/';

function keymapUpdate(k: KeymapKeys, fn: (from: KeymapKeys, to: number) => void) {
  return (v:string) => fn(k, parseInt(v));
}

function NesKeymap() {
  let [{keymap}, {getKeymap, updateKeymap}] = useAllState();

  useEffect(() => {
    getKeymap();
  });

  return (
    <div className="main-nes-keymap-top">
      {keymap.map(obj => {
        let upValue = String.fromCharCode(obj.up);
        let downValue = String.fromCharCode(obj.down);
        let leftValue = String.fromCharCode(obj.left);
        let rightValue = String.fromCharCode(obj.right);

        let selectValue = String.fromCharCode(obj.select);
        let startValue = String.fromCharCode(obj.start);
        let bValue = String.fromCharCode(obj.b);
        let aValue = String.fromCharCode(obj.a);

        let v = Object.values(obj).join('');

        return (
          <div key={v} className="main-nes-keymap">
            <div className="direction">
              <div className="up">
                <InputText value={upValue} onChange={keymapUpdate('up', updateKeymap)} />
              </div>
              <div className="down">
                <InputText value={downValue} onChange={keymapUpdate('down', updateKeymap)} />
              </div>
              <div className="left">
                <InputText value={leftValue} onChange={keymapUpdate('left', updateKeymap)} />
              </div>
              <div className="right">
                <InputText value={rightValue} onChange={keymapUpdate('right', updateKeymap)} />
              </div>
            </div>
            <div className="op">
              <div className="select">
                <InputText value={selectValue} onChange={keymapUpdate('select', updateKeymap)} />
              </div>
              <div className="start">
                <InputText value={startValue} onChange={keymapUpdate('start', updateKeymap)} />
              </div>
            </div>
            <div className="ab">
              <div className="b">
                <InputText value={bValue} onChange={keymapUpdate('b', updateKeymap)} />
              </div>
              <div className="a">
                <InputText value={aValue} onChange={keymapUpdate('a', updateKeymap)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NesKeymap;
