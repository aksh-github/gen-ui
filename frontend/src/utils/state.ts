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

export type ANY = string | number | null | undefined;

export type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  variant?: MESSAGE_VARIANT;
};

// const INTENT_LIST = [
//   "SOCIAL_MEDIA_CONTENT_CREATION",
//   "AGILE_PLANNING_AND_ARTIFACTS",
//   "READABILITY_AND_COMPLIANCE_SCORING",
//   "MARKETING_EMAIL_COMPLIANCE",
//   "FORMAL_CONTENT_TRANSFORMATION",
// ];

export const intentToJsonfie = new Map<string, string>([
  ["AGILE_PLANNING_AND_ARTIFACTS", "agile.json"],
  ["SOCIAL_MEDIA_CONTENT_CREATION", "social.json"],
]);
