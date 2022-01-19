import { Point } from "../types/Point";

export class FPSViewer {
  position: Point
  constructor(position: Point) {
    this.position = position;
  }

  keyboard_event_down(key: string) { }
  keyboard_event_up(key: string) { }

  update() { }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    const fps = (1 / delta).toFixed(2);
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`FPS: ${fps}`, this.position.x, this.position.y);
  }
}
