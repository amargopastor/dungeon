import { drawManager } from "../effects/DrawManager";
import { Point } from "../types/Point";
import { gameManager } from "../state/GameManager";
import { Actor, IActor } from "./Actor";

export class Chest extends Actor implements IActor {
  value: string;
  num: number;
  open: boolean
  constructor(position: Point, value: string, num: number, open: boolean) {
    super({ x: position.x, y: position.y })
    this.value = value;
    this.num = num;
    this.open = open;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    if (this.open || gameManager.debug) {
      drawManager.drawElements(ctx, "openChest", this.position, delta);
      switch (this.value) {
        case "AA":
          drawManager.drawElements(ctx, "rock", this.position, delta);
          drawManager.drawHeaders(ctx, "rock", this.num);
          break;
        case "BB":
          drawManager.drawElements(ctx, "water", this.position, delta);
          drawManager.drawHeaders(ctx, "water", this.num);
          break;
        case "CC":
          drawManager.drawElements(ctx, "fire", this.position, delta);
          drawManager.drawHeaders(ctx, "fire", this.num);
          break;
        default:
          break;
      }
    } else {
      drawManager.drawElements(ctx, "closedChest", this.position);
    }
  }
}
