declare global {
  interface Window {
    AudioContext(): any;
  }
}

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

  declare class NES {
    constructor(arg:NESInit):void;
    public loadROM(romData:any):void;
  }
}
