/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { dungeonMap } from "../../public/assets/maps/dungeonMaps";

const LVL = {
  1: {
    heroSpeed: 50,
    heroNumber: 4,
    myDungeonMap: dungeonMap[1],
    viewField: 500,
  },
  2: {
    heroSpeed: 70,
    heroNumber: 6,
    myDungeonMap: dungeonMap[2],
    viewField: 200,
  },
  3: {
    heroSpeed: 80,
    heroNumber: 8,
    myDungeonMap: dungeonMap[3],
    viewField: 150,
  },
};

class GameMaster {
  constructor() {
    this.level = 1;

    // GAME SETTINGS
    this.heroSpeed = LVL[this.level].heroSpeed;
    this.heroNumber = LVL[this.level].heroNumber;
    this.myDungeonMap = LVL[this.level].myDungeonMap;
    this.viewField = LVL[this.level].viewField;

    // GAME STATUS
    this.skeletonPosition = {};
    this.allChestsOpen = false;
    this.isSkeletonDead = false;

    this.debug = false;
    return this;
  }

  update(deltaSeconds) {}

  keyboardEvent(key) {}

  draw(delta, ctx) {}
}

export const myGameMaster = new GameMaster();
