import { mapsArray } from "../../public/assets/maps/mapsArray";
import { Level } from "../types/Level";

const mode: Array<Level> = [
  {
    foeSpeed: 70,
    foeNumber: 8,
    currentDungeonMap: mapsArray[0],
    viewField: 250,
  },
  {
    foeSpeed: 70,
    foeNumber: 6,
    currentDungeonMap: mapsArray[1],
    viewField: 200,
  },
  {
    foeSpeed: 80,
    foeNumber: 8,
    currentDungeonMap: mapsArray[2],
    viewField: 150,
  }
]

class GameMaster {
  currentLevel: number;
  foeSpeed: number;
  foeNumber: number;
  currentDungeonMap: string;
  viewField: number;
  heroPosition: any;
  allChestsOpen: boolean;
  deadHero: boolean;
  debug: boolean;

  constructor() {
    this.currentLevel = 0;

    // GAME SETTINGS
    this.foeSpeed = mode[this.currentLevel].foeSpeed;
    this.foeNumber = mode[this.currentLevel].foeNumber;
    this.currentDungeonMap = mode[this.currentLevel].currentDungeonMap;
    this.viewField = mode[this.currentLevel].viewField;

    // GAME STATUS
    this.heroPosition = {};
    this.allChestsOpen = false;
    this.deadHero = false;

    this.debug = false;
    return this;
  }

  update(delta: number) { }

  keyboard_event_down(key: string) { }

  draw(delta: number, ctx: CanvasRenderingContext2D) { }
}

export const gameManager = new GameMaster();
