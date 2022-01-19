import { chestManager } from "./actors/ChestManager";
import { foeManager } from "./actors/FoeManager";
import { dungeonMap } from "./actors/Map";
// import { gameManager } from "./actors/GameMaster";

import { Hero } from "./actors/Hero";

import { FPSViewer } from "./actors/FPSViewer";
import { Chronometer } from "./actors/Chronometer";
import { UpperMessage } from "./actors/UpperMessage";

// import { AudioStatus } from "./actors/AudioStatus";
// import { am } from "../src/effects/AudioManager.js";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Actors
  const map = dungeonMap;
  foeManager.setHeroes();
  const initialPos = map.GetDungeonStart();

  const fps = new FPSViewer({ x: 5, y: 15 });
  const chrono = new Chronometer({ x: 100, y: 15 });
  const upperMessage = new UpperMessage({ x: 100, y: 15 });
  // const audio = new AudioStatus({ x: 250, y: 15 });
  const hero = new Hero(initialPos, map);

  const actors = [
    map,
    fps,
    chrono,
    upperMessage,
    // audio,
    hero,
    ...chestManager.chests,
    ...foeManager.foes,
  ];

  // GAME LOOP -> BUCLE DE RENDERIZADO Y ACTUALIZACIÓN
  let lastFrame = 0;
  const render = (time: number) => {
    const delta = (time - lastFrame) / 1000;
    lastFrame = time;
    actors.forEach((actor) => actor.update && actor.update(delta));
    ctx.clearRect(0, 0, 650, 720);
    actors
      .sort((a, b) => a.position.y - b.position.y)
      .forEach((actor) => actor.draw(delta, ctx));
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);

  document.body.addEventListener("keydown", (e) => {
    actors.forEach(
      (actor) => actor.keyboard_event_down && actor.keyboard_event_down(e.key)
    );
  });
  document.body.addEventListener("keyup", (e) => {
    actors.forEach(
      (actor) => actor.keyboard_event_up && actor.keyboard_event_up(e.key)
    );
  });
};
