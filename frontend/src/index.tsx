import { App } from "./App";

import { h, mount } from "@vdom-lib";

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

mount(app, () => <App type="dyn" />);
