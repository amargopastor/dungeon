import { gameManager } from "../state/GameManager";
import { dungeonMap } from "./Map";
import { Foe } from "./Foe";

class FoeManager {
  foes: Array<Foe>
  constructor() {
    this.foes = [];
    return this;
  }

  update(delta: number) { }

  keyboard_event_down(key: string) { }
  keyboard_event_up(key: string) { }

  draw(delta: number, ctx: CanvasRenderingContext2D) { }

  setHeroes() {
    for (let i = 0; i < gameManager.foeNumber; i += 1) {
      this.foes.push(new Foe(this.heroStartOptions(), dungeonMap));
    }
  }

  heroStartOptions() {
    let availablePositions = [];
    availablePositions = dungeonMap.getRandomLocations("hero");
    let random = 0;
    random = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[random];
  }
}
export const foeManager = new FoeManager();
