const root: Window = typeof window === "undefined" ? (global as any as Window) : window;
(root as any).performance = root.performance || {
    now: () => Date.now(),
} as Performance;

// overriding the default methods so that requestAnimationFrame can be used together
// with jest.useFakeTimers() and methods like jest.runAllTimers().
root.requestAnimationFrame = ((cb: FrameRequestCallback) => root.setTimeout(() => cb(performance.now()), 0));
root.cancelAnimationFrame = ((id) => root.clearTimeout(id));

import { configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
configure({
    adapter: new (Adapter as any)(),
});
