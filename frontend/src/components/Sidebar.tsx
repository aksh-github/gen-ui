import { h } from "@vdom-lib";
import "./Sidebar.css";
import { currState } from "../utils/state";
import { JsonFormConsumer } from "./dyn-json/JsonFormConsumer";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { currentIntent, inProgress, id } = currState.get();
  // console.log(currState.get());

  return (
    <aside
      className={`chat-sidebar ${isOpen ? "open" : "closed"}`}
      aria-label="Chat sidebar"
    >
      <div className="sidebar-header">
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          title={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isOpen}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      <div className="sidebar-body" aria-hidden={!isOpen}>
        {/* <h3>Current Intent: {currentIntent || "None"}</h3>
        <p>Running: {inProgress ? "Yes" : "No"}</p> */}
        {inProgress ? (
          <div>
            <button
              className="btn btn-danger"
              onClick={() =>
                currState.set({
                  ...currState.get(),
                  currentIntent: "",
                  inProgress: false,
                })
              }
            >
              &larr; Cancel and Go Back
            </button>
            <JsonFormConsumer
              key={`k` + id}
              currentIntent={currentIntent}
              id={id}
            />
          </div>
        ) : (
          <div className="sidebar-empty-state">
            <div className="sidebar-empty-icon" aria-hidden="true">
              :)
            </div>
            <p className="sidebar-empty-title">You're all caught up</p>
            <p className="sidebar-empty-copy">Nothing for now.</p>
          </div>
        )}
      </div>
      {/* <button
        onClick={() =>
          currState.set({
            ...currState.get(),
            currentIntent: "",
            inProgress: false,
          })
        }
      >
        Reset
      </button> */}
    </aside>
  );
}
