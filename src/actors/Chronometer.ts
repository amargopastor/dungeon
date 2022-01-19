import { Point } from "../types/Point";
import { gameManager } from "../state/GameManager";

export class Chronometer {
  position: Point;
  seg: number;
  min: number
  constructor(position: Point) {
    this.position = position;
    this.seg = 0;
    this.min = 0;
  }

  keyboard_event_down(key: string) { }
  keyboard_event_up(key: string) { }

  update() { }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    if (!gameManager.deadHero && !gameManager.allChestsOpen) {
      this.seg += delta;
      if (this.seg > 9.99) {
        this.min += 1;
        this.seg = 0;
      }
    }
    const currentTimer = `Time: ${this.min}:` + `${this.seg.toFixed(0)}`.padStart(2, "0");
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${currentTimer} `, this.position.x, this.position.y);
  }
}
