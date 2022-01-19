import { gameManager } from "../state/GameManager";
import { dungeonMap } from "./Map";
import { Chest } from "./Chest";
import _ from "lodash"

class ChestManager {
  chests: Array<Chest>;
  lastChest: string;
  constructor() {
    this.chests = [
      // position,ID,num,head
      new Chest(this.startPosition(), "AA", 0, false),
      new Chest(this.startPosition(), "AA", 1, false),
      new Chest(this.startPosition(), "BB", 0, false),
      new Chest(this.startPosition(), "BB", 1, false),
      new Chest(this.startPosition(), "CC", 0, false),
      new Chest(this.startPosition(), "CC", 1, false),
    ];
    this.lastChest = "";
    // return this;
  }

  update(delta: number) { }

  keyboard_event_down(key: string) { }
  keyboard_event_up(key: string) { }

  draw(delta: number, ctx: CanvasRenderingContext2D) { }

  startPosition() {
    let availablePositions = dungeonMap.getRandomLocations("chest");
    let random = _.random(1, availablePositions.length)
    return availablePositions[random];
  }

  status() {
    gameManager.allChestsOpen = this.chests.every((e) => e.open === true);
  }
}
export const chestManager = new ChestManager();
