export enum Carkey {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export interface KeyboardMap {
    [key: string]: Carkey;
}

export let MAP_A = {
    ArrowUp: Carkey.UP,
    ArrowDown: Carkey.DOWN,
    ArrowLeft: Carkey.LEFT,
    ArrowRight: Carkey.RIGHT,
};
export let MAP_B = {
    w: Carkey.UP,
    s: Carkey.DOWN,
    a: Carkey.LEFT,
    d: Carkey.RIGHT,
};