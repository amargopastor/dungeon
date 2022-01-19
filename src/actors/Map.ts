import { drawManager } from "../effects/DrawManager";
import { Point } from "../types/Point";
import { gameManager } from "../state/GameManager";

class Map {
  position: Point;
  tileSize: number;
  currentLevel: number;
  map: any
  constructor(tileSize: number = 23) {
    this.position = { x: 0, y: 0 };
    this.tileSize = tileSize;
    this.currentLevel = gameManager.currentLevel;

    const rows = gameManager.currentDungeonMap.trim().split("\n");
    this.map = rows.map((row) => row.split(""));
    return this;
  }

  GetDungeonStart() {
    for (let i = 0; i < this.map.length; i += 1) {
      for (let j = 0; j < this.map[i].length; j += 1) {
        if (this.map[i][j] === "S") {
          return this.editedTilePos(i, j);
        }
      }
    }
    throw new Error("Set the S for hero position start");
  }

  getRandomLocations(element: string) {
    const availablePositions = [];
    for (let i = 0; i < this.map.length; i += 1) {
      for (let j = 0; j < this.map[i].length; j += 1) {
        if (this.map[i][j] === ".") {
          element === "chest"
            ? availablePositions.push(this.tilePos(i, j))
            : availablePositions.push(this.editedTilePos(i, j));
        }
      }
    }
    return availablePositions;
  }

  posToTile(position: Point) {
    const i = Math.floor((position.x - this.position.x) / this.tileSize);
    const j = Math.floor((position.y - this.position.y) / this.tileSize);
    return [j, i];
  }

  tileAtIndex(tileIndex: any) {
    try {
      const tile = this.map[tileIndex[0]][tileIndex[1]];
      return tile;
    } catch (error) {
      return false;
    }
  }

  tile(position: Point, direction: any) {
    const tileIndex = this.posToTile(position);
    const facing = [tileIndex[0] + direction[1], tileIndex[1] + direction[0]];
    const tile = this.tileAtIndex(facing);
    return tile;
  }

  tilePos(i: any, j: any) {
    return {
      x: this.position.x + j * this.tileSize,
      y: this.position.y + i * this.tileSize,
    };
  }

  editedTilePos(i: any, j: any) {
    return {
      x: this.position.x + this.tileSize * j + this.tileSize / 2,
      y: this.position.y + this.tileSize * i + this.tileSize / 2,
    };
  }

  drawWall(ctx: CanvasRenderingContext2D, i: any, j: any) {
    drawManager.drawElements(ctx, "wall", this.tilePos(i, j));
  }

  drawFloor(ctx: CanvasRenderingContext2D, i: any, j: any) {
    drawManager.drawElements(ctx, "floor", this.tilePos(i, j));
  }

  drawTorch(delta: number, ctx: any, i: any, j: any) {
    this.drawWall(ctx, i, j);
    const animationOffset = Math.floor(Math.random() * 8);
    drawManager.drawElements(
      ctx,
      "torch",
      this.tilePos(i, j),
      delta,
      animationOffset
    );
  }

  keyboard_event_down(key: string) { }
  keyboard_event_up(key: string) { }

  update() { }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.map.length; i += 1) {
      for (let j = 0; j < this.map[i].length; j += 1) {
        const cell = this.map[i][j];
        if (cell === "W") this.drawWall(ctx, i, j);
        if (cell === "i") this.drawTorch(delta, ctx, i, j);
        if (cell === "." || cell === "S" || cell === "e")
          this.drawFloor(ctx, i, j);
      }
    }
  }
}
export const dungeonMap = new Map();