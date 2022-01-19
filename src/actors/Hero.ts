import { gameManager } from "../state/GameManager";
import { chestManager } from "./ChestManager";
import { Point } from "../types/Point";
// import { am } from "../effects/AudioManager.js";

const heroIMG = require("../../public/images/hero.png");

export class Hero {
  position: Point;
  heroSize: number;
  spritesheet: any;
  sequences: Array<object>;
  framePos: number;
  time: number;
  currentSequence: string;
  speed: any;
  map: any
  constructor(position: Point, map: any) {
    this.position = { x: position.x, y: position.y };
    this.heroSize = 10;

    this.spritesheet = new Image();
    this.spritesheet.src = heroIMG;
    this.sequences = [
      { name: "still-down", numFrames: 2, ySeqPos: 2 },
      { name: "still-left", numFrames: 2, ySeqPos: 1 },
      { name: "still-up", numFrames: 2, ySeqPos: 0 },
      { name: "still-right", numFrames: 2, ySeqPos: 3 },
      { name: "still-dead", numFrames: 1, ySeqPos: 20 },
      { name: "still-dance", numFrames: 5, ySeqPos: 14 },
      { name: "moving-down", numFrames: 7, ySeqPos: 10 },
      { name: "moving-left", numFrames: 7, ySeqPos: 9 },
      { name: "moving-up", numFrames: 7, ySeqPos: 8 },
      { name: "moving-right", numFrames: 7, ySeqPos: 11 },
    ];
    this.framePos = 0;
    this.time = 0;
    this.currentSequence = "down";
    this.speed = { x: 0, y: 0 };

    this.map = map;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    const frameSize = { x: 64, y: 64 };
    const seqName =
      this.speed.x === 0 && this.speed.y === 0
        ? `still-${this.currentSequence}`
        : `moving-${this.currentSequence}`;
    const seq: any = this.sequences.find((s: any) => s.name === seqName);
    if (!seq) throw new Error("invalid seq");

    this.drawShadow(ctx);

    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    ctx.drawImage(
      this.spritesheet,
      frameSize.x * this.framePos,
      frameSize.y * seq.ySeqPos,
      frameSize.x,
      frameSize.y,
      this.position.x - 20,
      this.position.y - 25,
      frameSize.x - 25,
      frameSize.y - 25
    );

    this.time += delta;
    this.framePos = Math.floor(this.time * seq.numFrames) % seq.numFrames;

    gameManager.heroPosition = this.position;
    chestManager.status();
  }

  update(delta: number) {
    if (gameManager.deadHero && !gameManager.debug) {
      this.currentSequence = "dead";
      this.speed = { x: 0, y: 0 };
      this.framePos = 5;
    } else if (gameManager.allChestsOpen && this.currentSequence !== "dance") {
      this.currentSequence = "dance";
      this.speed = { x: 0, y: 0 };
      this.framePos = 2;
    } else {
      const newPosX = this.position.x + this.speed.x * delta;
      const newPosY = this.position.y + this.speed.y * delta;

      const direction = this.getDirection();
      const tip = {
        x: this.position.x - direction[0] * this.heroSize,
        y: this.position.y - direction[1] * this.heroSize,
      };

      const tile = this.map.tile(tip, direction);
      if (tile !== "W" && tile !== "i") {
        this.position.x = newPosX;
        this.position.y = newPosY;
      }
    }
  }

  getDirection() {
    // Calculate direction based on speed
    let direction = [1, 0];
    if (this.speed.x !== 0 && this.speed.x < 0) {
      direction = [-1, 0];
    }
    if (this.speed.y !== 0 && this.speed.y > 0) {
      direction = [0, 1];
    }
    if (this.speed.y !== 0 && this.speed.y < 0) {
      direction = [0, -1];
    }
    return direction;
  }

  keyboard_event_down(key: string) {
    switch (key) {
      case "ArrowLeft":
        this.currentSequence = "left";
        this.speed.x = -100;
        break;
      case "ArrowRight":
        this.currentSequence = "right";
        this.speed.x = 100;
        break;
      case "ArrowUp":
        this.currentSequence = "up";
        this.speed.y = -100;
        break;
      case "ArrowDown":
        this.currentSequence = "down";
        this.speed.y = 100;
        break;
      case "a":
        this.open();
        break;
      case "A":
        this.open();
        break;
      default:
        break;
    }
  }

  keyboard_event_up(key: string) {
    this.speed.x = 0;
    this.speed.y = 0;
  }

  open() {
    let distance = 0;
    chestManager.chests.forEach((ori) => {
      distance = 0;
      distance = Math.sqrt(
        Math.pow(this.position.x - ori.position.x, 2) +
        Math.pow(this.position.y - ori.position.y, 2)
      );
      if (distance < 30 && !ori.open) {
        switch (chestManager.lastChest) {
          case "":
            ori.open = true;
            chestManager.lastChest = ori.value;
            break;
          case ori.value:
            ori.open = true;
            chestManager.lastChest = "";
            break;
          default:
            chestManager.chests.forEach((e) => (e.open = false));
            chestManager.lastChest = "";
            ori.open = true;
            chestManager.lastChest = ori.value;
            break;
        }
      }
    });
  }

  drawShadow(ctx: CanvasRenderingContext2D) {
    if (this.currentSequence === "dance") gameManager.viewField++;
    // Create a canvas that we will use as a mask
    const canvas: any = document.getElementById("canvas");
    const maskCanvas: any = document.getElementById("canvasShadow");
    // Ensure same dimensions
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext("2d");
    // This color is the one of the filled shape
    maskCtx.fillStyle = "black";
    // Fill the mask
    maskCtx.fillRect(0, 38, maskCanvas.width, maskCanvas.height);

    // Set xor operation
    maskCtx.globalCompositeOperation = "destination-out";
    // Draw the shape you want to take out
    maskCtx.arc(
      this.position.x,
      this.position.y,
      gameManager.viewField,
      0,
      2 * Math.PI
    );
    maskCtx.fill();

    // Draw mask on the image, and done !
    ctx.drawImage(maskCanvas, 0, 0);
  }
}
