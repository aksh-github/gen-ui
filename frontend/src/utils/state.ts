import { createContext } from "@vdom-lib";

export const currState = createContext({
  currentIntent: "",
  id: 0,
  inProgress: false,
});
