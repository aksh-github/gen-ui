import { createContext } from "@vdom-lib";

export const currState = createContext({
  currentIntent: "",
  id: 0,
  inProgress: false,
});

export const UNKNOWN = "UNKNOWN";

// export type  = "ERROR" | "WARN" | "INFO" | "DEBUG";
// export const MESSAGE_VARIANT = ["ERROR", "WARN"] as const;
export const enum MESSAGE_VARIANT {
  ERROR = "error",
  WARN = "warn",
}

export const SERVER_UNREACHABLE_MESSAGE =
  "Couldn't reach the server right now.";

export const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  variant?: MESSAGE_VARIANT;
};
