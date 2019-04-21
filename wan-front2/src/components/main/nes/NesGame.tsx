import React, {useEffect, useState, useRef} from "react";
import {nesLoadUrl, nesLoadData, getNesObj} from 'src/tools/nesEmbed';
import {useAllState} from 'src/mobx/';

interface NesGameProps {
  historyId:string;
  nesId:string;
}

export default function NesGame (props: NesGameProps) {
  const [{onlineList}] = useAllState();
  const current = onlineList.data.filter(obj => obj._id === props.nesId)[0];

  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elRef.current) {
      let s:CSSStyleDeclaration = getComputedStyle(elRef.current as HTMLDivElement)
      let h:number = parseInt(s.height as string);
      (elRef.current.querySelector('canvas') as HTMLCanvasElement).style.height = String(h * 0.8 + 'px');

      nesLoadUrl('nesGameId', current.fileResource);
    }
  }, [props.nesId]);

  return (
    <div ref={elRef} className="main-nes-canvas-box">
      <canvas id="nesGameId" width="256" height="240" />
    </div>
  );
}
