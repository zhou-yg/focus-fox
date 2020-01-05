declare module 'jsnes' {

  interface NESInit {
    onFrame: (framebuffer_24:any) => void;
    onAudioSample: (l:any, r:any) => void;
  }

  export interface ControllerType {
    BUTTON_UP: any;
    BUTTON_DOWN: any;
    BUTTON_LEFT: any;
    BUTTON_RIGHT: any;
    BUTTON_A: any;
    BUTTON_B: any;
    BUTTON_SELECT: any;
    BUTTON_START: any;
  }

  export const Controller: ControllerType;

  export const buttonDown = (player:1, btnType: any) => {};

  interface NesJSON {
    romData;
    cpu;
    mmap;
    ppu;
  }

  export class NES {
    constructor(arg:NESInit):void;
    loadROM(romData:any):void;
    frame():void;
    buttonDown():void;
    buttonUp():void;
    toJSON():void;
    reset(): void;
  }
}
