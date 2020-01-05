/// <reference path="./nesEmbed.d.ts" />
import jsnes from 'jsnes';

let SCREEN_WIDTH = 256;
let SCREEN_HEIGHT = 240;
let FRAMEBUFFER_SIZE = SCREEN_WIDTH*SCREEN_HEIGHT;

let canvas_ctx: any;
let image: any;
let framebuffer_u8:any;
let framebuffer_u32:any;

let AUDIO_BUFFERING = 512;
let SAMPLE_COUNT = 4*1024;
let SAMPLE_MASK = SAMPLE_COUNT - 1;
let audio_samples_L = new Float32Array(SAMPLE_COUNT);
let audio_samples_R = new Float32Array(SAMPLE_COUNT);
let audio_write_cursor = 0;
let audio_read_cursor = 0;
// raf 计时器
let gameFrameFlag: number = 0;

let nes = new jsnes.NES({
	onFrame: function(framebuffer_24:any){
		for(let i = 0; i < FRAMEBUFFER_SIZE; i++) framebuffer_u32[i] = 0xFF000000 | framebuffer_24[i];
	},
	onAudioSample: function(l:any, r:any){
		audio_samples_L[audio_write_cursor] = l;
		audio_samples_R[audio_write_cursor] = r;
		audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK;
	},
});


function onAnimationFrame(){
  console.log('aniframe')
	gameFrameFlag = window.requestAnimationFrame(onAnimationFrame);
	image.data.set(framebuffer_u8);
	canvas_ctx.putImageData(image, 0, 0);
	nes.frame();
}

function audio_remain(){
	return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK;
}

function audio_callback(event:any){
	let dst = event.outputBuffer;
	let len = dst.length;

	// Attempt to avoid buffer underruns.
	if(audio_remain() < AUDIO_BUFFERING) nes.frame();

	let dst_l = dst.getChannelData(0);
	let dst_r = dst.getChannelData(1);
	for(let i = 0; i < len; i++){
		let src_idx = (audio_read_cursor + i) & SAMPLE_MASK;
		dst_l[i] = audio_samples_L[src_idx];
		dst_r[i] = audio_samples_R[src_idx];
	}

	audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK;
}

function keyboard(callback:any, event:KeyboardEvent, player:number = 1, keymaps: Array<KeymapResUnit>){
  console.log(event.keyCode, keymaps);
  keymaps.forEach(obj => {
    console.log(obj.up, obj.toString())
    switch(event.keyCode){
  		case obj.up: // UP
  			callback(player, jsnes.Controller.BUTTON_UP); break;
  		case obj.down: // Down
  			callback(player, jsnes.Controller.BUTTON_DOWN); break;
  		case obj.left: // Left
  			callback(player, jsnes.Controller.BUTTON_LEFT); break;
  		case obj.right: // Right
  			callback(player, jsnes.Controller.BUTTON_RIGHT); break;
  		case obj.a: // 'a' - qwerty, dvorak
  			callback(player, jsnes.Controller.BUTTON_A); break;
  		case obj.b: // 's' - qwerty, azerty
  			callback(player, jsnes.Controller.BUTTON_B); break;
  		case obj.select: // Tab
  			callback(player, jsnes.Controller.BUTTON_SELECT); break;
  		case obj.start: // Return
  			callback(player, jsnes.Controller.BUTTON_START); break;
  		default: break;
  	}
  });
}

function nes_init(canvas_id:string){
	let canvas:HTMLCanvasElement = document.getElementById(canvas_id) as HTMLCanvasElement;
	canvas_ctx = canvas.getContext("2d");
	image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	canvas_ctx.fillStyle = "black";
	canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	// Allocate framebuffer array.
	let buffer = new ArrayBuffer(image.data.length);
	framebuffer_u8 = new Uint8ClampedArray(buffer);
	framebuffer_u32 = new Uint32Array(buffer);

	// Setup audio.
	let audio_ctx:AudioContext = new AudioContext();
	let script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
	script_processor.onaudioprocess = audio_callback;
	script_processor.connect(audio_ctx.destination);
}

function nes_boot(rom_data: any){
	nes.loadROM(rom_data);
  gameStart();
}
function gameStart () {
  gameFrameFlag = window.requestAnimationFrame(onAnimationFrame);
}
function gameStop () {
  window.cancelAnimationFrame(gameFrameFlag);
}

export function nesLoadData(canvas_id:string, rom_data:string){
	nes_init(canvas_id);
	nes_boot(rom_data);
}

export function nesLoadUrl(
  canvas_id: string,
  path: string,
  keymaps: Array<KeymapResUnit>,
  loadDone: (nes:jsnes.NES) => void,
) {

	let req = new XMLHttpRequest();
	req.open("GET", path);
	req.overrideMimeType("text/plain; charset=x-user-defined");

  let onerror = () => console.log(`Error loading ${path}: ${req.statusText}`);

	req.onerror = onerror;

	req.onload = function() {
		if (this.status === 200) {
      nes_init(canvas_id);
      setTimeout(() => {
        nes_boot(this.responseText);

        setTimeout(() => {
        //   window.test = nes;
        //   console.log(nes.toJSON())
          loadDone(nes);
        }, 0);
      });
		} else if (this.status === 0) {
			// Aborted, so ignore error
		} else {
			onerror();
		}
	};

	req.send();

  let keydownFn: (e:KeyboardEvent) => void = (e:KeyboardEvent) => keyboard(nes.buttonDown, e, 1, keymaps);
  let keyupFn: (e:KeyboardEvent) => void = (e:KeyboardEvent) => keyboard(nes.buttonUp, e, 1, keymaps);

  console.log('key event');
  document.addEventListener('keydown', keydownFn);
  document.addEventListener('keyup', keyupFn);

  return () => {
    gameStop();
    document.removeEventListener('keydown', keydownFn);
    document.removeEventListener('keyup', keyupFn);
  };
}

export function getNesObj() : jsnes.NES {
  return nes;
}
