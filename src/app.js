import { myChestManager } from "./actors/ChestManager";
import { myHeroManager } from "./actors/HeroManager";
import { myMap } from "./actors/Map";
// import { myGameMaster } from "./actors/GameMaster";

import { Skeleton } from "./actors/Skeleton";

import { FPSViewer } from "./actors/FPSViewer";
import { Chronometer } from "./actors/Chronometer";
import { UpperMessage } from "./actors/UpperMessage";

// import { AudioStatus } from "./actors/AudioStatus";
// import { am } from "../src/effects/AudioManager.js";

window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Actors
  const map = myMap;
  myHeroManager.setHeroes();
  const initialPos = map.GetDungeonStart();

  const fps = new FPSViewer({ x: 5, y: 15 });
  const chrono = new Chronometer({ x: 100, y: 15 });
  const upperMessage = new UpperMessage({ x: 100, y: 15 });
  // const audio = new AudioStatus({ x: 250, y: 15 });
  const skeleton = new Skeleton(initialPos, map);

  const actors = [
    map,
    fps,
    chrono,
    upperMessage,
    // audio,
    skeleton,
    ...myChestManager.chests,
    ...myHeroManager.heroes,
  ];

  // GAME LOOP -> BUCLE DE RENDERIZADO Y ACTUALIZACIÓN
  let lastFrame = 0;
  const render = (time) => {
    const delta = (time - lastFrame) / 1000;
    lastFrame = time;
    actors.forEach((actor) => actor.update && actor.update(delta));
    ctx.clearRect(0, 0, 650, 720);
    actors
      .sort((a, b) => a.position.y - b.position.y)
      .forEach((actor) => actor.draw(delta, ctx));
    window.requestAnimationFrame(render);
  };

  // setInterval(render, frameTime);
  window.requestAnimationFrame(render);

  // Eventos de teclado
  document.body.addEventListener("keydown", (e) => {
    actors.forEach(
      (actor) => actor.keyboardEvent && actor.keyboardEvent(e.key),
    );
  });
  document.body.addEventListener("keyup", (e) => {
    actors.forEach(
      (actor) => actor.keyboardEventUp && actor.keyboardEventUp(e.key),
    );
  });
};
