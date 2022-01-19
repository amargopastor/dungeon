import { Point } from "../types/Point";

export class AudioStatus {
  position: Point
  constructor(position: Point) {
    this.position = position;
  }

  keyboard_event_down(key: string) { }
  keyboard_event_up(key: string) { }

  update() { }

  draw(delta: number, ctx: CanvasRenderingContext2D) { }
}
