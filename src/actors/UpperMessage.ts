import { Point } from "../types/Point";
import { gameManager } from "../state/GameManager";

export class UpperMessage {
  position: Point
  constructor(position: Point) {
    this.position = position;
  }

  keyboard_event_down(key: string) { }
  keyboard_event_up(key: string) { }

  update() { }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Press 'a' to open the chests",
      this.position.x + 100,
      this.position.y,
    );
    ctx.fillText(
      `Level ${gameManager.currentLevel}`,
      this.position.x + 300,
      this.position.y,
    );
  }
}
